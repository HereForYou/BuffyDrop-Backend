process.env.NODE_ENV = process.env.NODE_ENV || "development";
var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Setting = mongoose.model("Setting");
const handleError = require("../config/utils/handleError");
const catchAsync = require("../config/utils/catchAsync");
const { Telegraf, Markup } = require("telegraf");
const { v4: uuidv4 } = require('uuid');
// const { getIo } = require("../config/socket");
var { BOT_TOKEN } = require("../config/Constants");

var cron = require('node-cron');

const bot = new Telegraf(BOT_TOKEN);

// const cycleTime = 10;

cron.schedule('0 0 * * *', async () => {// 24hr
    // cron.schedule('0 * * * *', async () => {// 1hr
    // cron.schedule(`*/${cycleTime} * * * *`, async () => {
    let AllUsers = await User.find({});
    await Promise.all(
        AllUsers.map(async (user) => {
            user.countDown = user.dailyTimeLimit.value * 60;
            user.task = user.task.filter(task => task !== 'dailyTask');
            await user.save();
        })
    );
});

exports.getUser = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { firstName, lastName, userName, start_param } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId })
        if (user) {
            return res.status(200).send({ user });
        } else {
            let inviteLink = uuidv4();
            const setting = await Setting.findOne();
            const dailyTimeLimit = setting.dailyTimeLimitList[0];
            const power = setting.powerList[0];
            const inviteRevenue = setting.inviteRevenue;
            const countDown = dailyTimeLimit.value * 60;
            if (start_param) {
                const owner = await User.findOne({ inviteLink: start_param });
                if (owner) {
                    User.create({ tgId, userName, firstName, lastName, isInvited: true, inviteLink, dailyTimeLimit, power, countDown })
                        .then(async (user) => {
                            //socket emit
                            const totalCount = await User.countDocuments({});
                            // const emitNewUserEvent = async () => {
                            //     const io = getIo();
                            //     io.emit('newUserRegistered', { totalCount });
                            // };
                            // await emitNewUserEvent();

                            if (!owner.friends.includes(tgId)) {
                                owner.friends.push(tgId);
                                owner.totalPoints += inviteRevenue;
                                await owner.save();
                                await bot.telegram.sendMessage(owner.tgId, `@${user.userName} has joined your Bleggs crypto Mine! 🌱🚀Get ready for more fun together! 👥💪`, {
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [
                                                {
                                                    text: 'Claim Now',
                                                    web_app: {
                                                        url: "https://app.bleggs.com"
                                                    }
                                                }
                                            ]
                                        ]
                                    })
                                });
                            }
                            return res.status(200).send({ user });
                        })
                        .catch((err) => {
                            handleError(err, res);
                        });
                }
                else {
                    return res.status(400).send("Unauthorized Invitation Link!");
                }
            }
            else {
                User.create({ tgId, userName, firstName, lastName, inviteLink, countDown, dailyTimeLimit, power })
                    .then(async (user) => {
                        const totalCount = await User.countDocuments({});
                        // const emitNewUserEvent = async () => {
                        //     const io = getIo();
                        //     io.emit('newUserRegistered', { totalCount });
                        // };
                        // await emitNewUserEvent();
                        return res.status(200).send({ user });
                    })
                    .catch((err) => {
                        handleError(err, res);
                    });
            }
        }
    }
    catch (err) {
        handleError(err, res);
    };
});

exports.updatePoints = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { points, countDown } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId });
        let divCountDown = user.countDown - countDown;
        if (countDown >= 0 && divCountDown >= 0) {
            const setting = await Setting.findOne();
            let newPoints = divCountDown * setting.powerList[user.power.id - 1].value;
            user.totalPoints += newPoints;
            user.countDown = countDown;
            await user.save();
        }
        return res.status(200).send(true);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateLevel = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { newLevel } = req.body;
    try {
        const result = await User.findOneAndUpdate(
            { tgId: tgId }, // Filter
            { $set: { level: newLevel } }, // Update
        );
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send(result);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateTimeLimit = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { newTimeLimit, fee, plusCountDown } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId });
        const setting = await Setting.findOne();
        const nextTimeLimit = setting.dailyTimeLimitList[user.dailyTimeLimit.id];
        if (user && fee >= nextTimeLimit.coinsToBoost && user.totalPoints >= fee) {
            user.dailyTimeLimit = nextTimeLimit;
            user.totalPoints -= fee;
            user.countDown = nextTimeLimit.value * 60;
            await user.save();
            return res.status(200).send(true);
        }
        else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        handleError(err, res);
    }
});

exports.updatePower = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { newPower, fee } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId });
        const setting = await Setting.findOne();
        const nextPower = setting.powerList[user.power.id];
        if (user && fee >= nextPower.coinsToBoost && user.totalPoints >= fee) {
            user.power = nextPower;
            user.totalPoints -= fee;
            await user.save();
            return res.status(200).send(true);
        }
        else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateTask = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { id, profit } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId });

        let tasks = user.task;
        if (!tasks.includes(id)) {
            user.task.push(id);
            user.totalPoints += profit;
            await user.save();
            return res.status(200).send(true);
        }
        else {
            return res.status(200).send(false);
        }
    } catch (err) {
        handleError(err, res);
    }
});

exports.getFriends = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    try {
        const user = await User.findOne({ tgId: tgId });
        let friends = user.friends;
        let friendsInfo = [];
        if (friends) {
            await Promise.all(friends.map(async (friend) => {
                let nFriend = await User.findOne({ tgId: friend });
                if (nFriend) {
                    friendsInfo.push(nFriend);
                }
            }));
            return res.status(200).send({
                inviteLink: user.inviteLink,
                friendsInfo: friendsInfo,
            });
        }
        else {
            return res.status(200).send({});
        }
    }
    catch (err) {
        handleError(err, res);
    };
});

exports.getAllUsers = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    try {
        const allUsers = await User.find({}, { totalPoints: 1, userName: 1, tgId: 1 }).sort({ totalPoints: -1 });
        let curUser = allUsers.filter(user => user.tgId === tgId)[0];
        let curUserIndex = allUsers.findIndex(user => user.tgId === tgId);

        return res.status(200).json({
            allUsers: allUsers,
            curUser: curUser,
            ranking: curUserIndex
        });
    }
    catch (err) {
        handleError(err, res);
    };
});

exports.getTopUsers = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let numUsers = parseInt(req.query.num);
    try {
        const topUsers = await User.find({}, { totalPoints: 1, userName: 1, tgId: 1 }).sort({ totalPoints: -1 }).limit(numUsers);
        let curUser = await User.findOne({ tgId });
        let curUserIndex = await User.countDocuments({ totalPoints: { $gt: curUser.totalPoints } });

        return res.status(200).json({
            topUsers: topUsers,
            curUser: curUser,
            ranking: curUserIndex
        });
    }
    catch (err) {
        handleError(err, res);
    };
});

exports.getAll = catchAsync(async (req, res) => {
    try {
        const allUsers = await User.find({});

        return res.status(200).json({
            allUsers
        });
    }
    catch (err) {
        handleError(err, res);
    };
});

exports.getAllCount = catchAsync(async (req, res) => {
    try {
        const totalCount = await User.countDocuments({});
        return res.status(200).json({
            totalCount
        });
    }
    catch (err) {
        handleError(err, res);
    };
});

exports.updateUser = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { points, countDown, power, dailyTimeLimit, level } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId });
        user.totalPoints = points;
        user.countDown = countDown;
        user.power = power;
        user.dailyTimeLimit = dailyTimeLimit;
        user.level = level;
        await user.save();
        return res.status(200).send(true);
    } catch (err) {
        handleError(err, res);
    }
});

exports.getTotalPoints = catchAsync(async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalPointsSum: { $sum: "$totalPoints" }
                }
            }
        ]);

        // Check if the result array is not empty and extract the sum
        const totalPointsSum = result.length > 0 ? result[0].totalPointsSum : 0;
        return res.status(200).send({ totalPointsSum: totalPointsSum });

    } catch (err) {
        handleError(err, res);
    }
});

exports.updateCountDown = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { id } = req.body;
    try {
        const result = await User.findOneAndUpdate(
            { tgId: tgId },
            { $set: { intervalId: id } },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send(result);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateDex = catchAsync(async (req, res) => {
    const tgId = req.params.id;
    let { dex } = req.body;
    try {
        const result = await User.findOneAndUpdate(
            { tgId: tgId },
            { $set: { dex: dex } },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send(result);
    } catch (err) {
        handleError(err, res);
    }
});

