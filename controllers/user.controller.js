process.env.NODE_ENV = process.env.NODE_ENV || "development";
var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Setting = mongoose.model("Setting");
const handleError = require("../config/utils/handleError");
const catchAsync = require("../config/utils/catchAsync");
const { Telegraf, Markup } = require("telegraf");
const { v4: uuidv4 } = require('uuid');
// const { getIo } = require("../config/socket");
var cron = require('node-cron');
const cycleTime = 60 * 1;
var systemcountDown = cycleTime;
// const stopAfterFive = setInterval(async () => {
//     systemcountDown--;
//     if (systemcountDown < 0) {
//         systemcountDown = cycleTime;
//         ////
//         setTimeout(async () => {
//             try {
//                 const user = await User.findOne();
//                 // let divCountDown = user.countDown - countDown;
//                 // if (countDown >= 0 && divCountDown >= 0) {
//                 const setting = await Setting.findOne();
//                 console.log("upateTotalpoint-----",);
//                 user.curPoints += user.countDown * setting.dailyRevenue;
//                 // user.countDown = countDown;
//                 await user.save();
//                 // }
//             } catch (err) {
//                 console.log(err);
//             }
//         }, 2000)

//     }
//     // console.log("time", countDown);

// }, 1000);
// cron.schedule('0 0 * * *', async () => {// 24hr
//     // cron.schedule('0 * * * *', async () => {// 1hr
//     // cron.schedule(`*/${cycleTime} * * * *`, async () => {
//     let AllUsers = await User.find({});
//     await Promise.all(
//         AllUsers.map(async (user) => {
//             user.countDown = 30 * 60;
//             user.task = user.task.filter(task => task !== 'dailyTask');
//             await user.save();
//         })
//     );
// });

exports.getUser = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { firstName, lastName, userName, start_param, style } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId })
        if (user) {
            let start = new Date(user.startFarming).getTime();
            let counttime = (Date.now() - start) / 1000;
            if (counttime > cycleTime) {
                return res.status(200).send({ user, signIn: true, remainTime: 0 });
            }
            else {
                return res.status(200).send({ user, signIn: true, remainTime: counttime });
            }

        } else {
            let inviteLink = uuidv4();
            const setting = await Setting.findOne();
            // const dailyTimeLimit = setting.dailyTimeLimitList[0];
            // const power = setting.powerList[0];
            const inviteRevenue = setting.inviteRevenue;
            // const countDown = 30 * 60;
            const rank = await User.find();
            const totalPoints = rank.length + 1;
            const joinRank = totalPoints
            if (start_param)
            ///invited user
            {
                const owner = await User.findOne({ inviteLink: start_param });
                if (owner) {
                    User.create({ tgId, userName, firstName, lastName, isInvited: true, inviteLink, countDown, totalPoints, joinRank, style, countDown: 0 })
                        .then(async (user) => {
                            if (!owner.friends.includes(tgId)) {
                                console.log("invitied user totalPoints amount----------", user.totalPoints, "-------------reward", inviteRevenue, systemcountDown)
                                // owner.friends.push(tgId, inviteRevenue * user.totalPoints);
                                owner.friends.push({ id: tgId, revenue: inviteRevenue * user.totalPoints });
                                owner.totalPoints += inviteRevenue * user.totalPoints;
                                await owner.save();
                                await bot.telegram.sendMessage(owner.tgId, `@${user.userName} the person you invited to Buffy has just been added, and you earned a reward! Check your tokens now! 🔥🍖`, {
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [
                                                {
                                                    text: 'Claim Now',
                                                    web_app: {
                                                        url: "https://buffydrop.xyz"
                                                    }
                                                }
                                            ]
                                        ]
                                    })
                                });
                            }
                            return res.status(200).send({ user, signIn: false, countDown: systemcountDown });
                        })
                        .catch((err) => {
                            handleError(err, res);
                        });
                }
                else {
                    return res.status(400).send("Unauthorized Invitation Link!");
                }
            }
            //new user
            else {
                User.create({ tgId, userName, firstName, lastName, inviteLink, totalPoints, joinRank, style, countDown: 0 })
                    .then(async (user) => {
                        let reward;
                        if (totalPoints < 11) {
                            reward = 0.1001;
                        }
                        else if (totalPoints < 101) { reward = 0.1; }
                        else if (totalPoints < 1001) { reward = 0.096; }
                        else if (totalPoints < 10001) { reward = 0.0949; }
                        else if (totalPoints < 100001) { reward = 0.065; }
                        else if (totalPoints < 1000001) { reward = 0.0190; }
                        else { reward = totalPoints * 0.01; }
                        console.log('invite reward amount-------------', reward, totalPoints, systemcountDown)
                        let settingDoc = await Setting.findOne();
                        settingDoc.inviteRevenue = reward;
                        await settingDoc.save();
                        return res.status(200).send({ user, signIn: false, countDown: systemcountDown });
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

exports.updateCount = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { countDown, cycle } = req.body;
    if (cycle) {
        try {
            const setting = await Setting.findOne();
            const user = await User.findOne({ tgId: tgId });
            // let divCountDown = user.countDown - countDown;
            // if (countDown >= 0 && divCountDown >= 0) {
            console.log("update---Point", countDown, "--");
            user.curPoints += countDown * setting.dailyRevenue;
            user.countDown = 0;

            // user.countDown = countDown;
            await user.save().then((userData => {
                return res.status(200).send({ status: true, user: userData, countDown: cycleTime });

            })).catch((err) => {
                console.log("updateCount err");

            });
            // }
        } catch (err) {
            handleError(err, res);
        }

    }
    else {
        try {
            const user = await User.findOne({ tgId: tgId });
            // let divCountDown = user.countDown - countDown;
            // if (countDown >= 0 && divCountDown >= 0) {
            console.log("update---countDown and point", countDown, "--");
            user.countDown += countDown;
            // user.countDown = countDown;
            await user.save().then((userData => {
                return res.status(200).send({ status: true, user: userData, countDown: systemcountDown });

            })).catch((err) => {
                console.log("updateCount err");

            });
            // }
        } catch (err) {
            handleError(err, res);
        }
    }

});
exports.updatePoint = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    try {
        const user = await User.findOne({ tgId: tgId });
        const setting = await Setting.findOne();

        // console.log("upate---point", user.curPoints);
        // user.totalPoints += user.curPoints;
        // user.curPoints = 0;
        // user.countDown = countDown;
        user.totalPoints += setting.dailyRevenue * cycleTime;
        await user.save().then((userData) => {
            console.log("updatepoint---", userData);

            return res.status(200).send({ status: true, user: userData, countDown: systemcountDown });

        }).catch((err) => {
            console.log("updatePoint err");

        });
        // const user1 = await User.findOne({ tgId: tgId });

        // }

    } catch (err) {
        handleError(err, res);
    }
});
// exports.updateTotalPoint = catchAsync(async (req, res) => {
//     let tgId = req.params.id;
//     try {
//         const user = await User.findOne({ tgId: tgId });
//         console.log("upate---point", user.curPoints);
//         user.totalPoints += user.curPoints;
//         user.curPoints = 0;
//         // user.countDown = countDown;
//         await user.save().then((userData) => {
//             console.log("updatepoint---", userData);

//             return res.status(200).send({ status: true, user: userData, countDown: systemcountDown });

//         }).catch((err) => {
//             console.log("updatePoint err");

//         });
//         // const user1 = await User.findOne({ tgId: tgId });

//         // }

//     } catch (err) {
//         handleError(err, res);
//     }
// });

exports.startFarming = catchAsync(async (req, res) => {

    let tgId = req.params.id;
    try {
        const user = await User.findOne({ tgId: tgId });
        user.startFarming = Date.now();
        await user.save().then(() => {
            console.log("OK");
        }).catch((err) => {
            console.log("error");

        })
        console.log("start----", Date.now());

        res.status(200).send({ cycleTime })
    } catch (err) {
        handleError(err, res);
    }
});

// exports.updateLevel = catchAsync(async (req, res) => {
//     let tgId = req.params.id;
//     let { newLevel } = req.body;
//     try {
//         const result = await User.findOneAndUpdate(
//             { tgId: tgId }, // Filter
//             { $set: { level: newLevel } }, // Update
//         );
//         if (!result) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         return res.status(200).send(result);
//     } catch (err) {
//         handleError(err, res);
//     }
// });

// exports.updateTimeLimit = catchAsync(async (req, res) => {
//     let tgId = req.params.id;
//     let { newTimeLimit, fee, plusCountDown } = req.body;
//     try {
//         const user = await User.findOne({ tgId: tgId });
//         const setting = await Setting.findOne();
//         const nextTimeLimit = setting.dailyTimeLimitList[user.dailyTimeLimit.id];
//         if (user && fee >= nextTimeLimit.coinsToBoost && user.totalPoints >= fee) {
//             user.dailyTimeLimit = nextTimeLimit;
//             user.totalPoints -= fee;
//             user.countDown = nextTimeLimit.value * 60;
//             await user.save();
//             return res.status(200).send(true);
//         }
//         else {
//             return res.status(404).send({ message: "User not found" });
//         }
//     } catch (err) {
//         handleError(err, res);
//     }
// });

// exports.updatePower = catchAsync(async (req, res) => {
//     let tgId = req.params.id;
//     let { newPower, fee } = req.body;
//     try {
//         const user = await User.findOne({ tgId: tgId });
//         const setting = await Setting.findOne();
//         const nextPower = setting.powerList[user.power.id];
//         if (user && fee >= nextPower.coinsToBoost && user.totalPoints >= fee) {
//             user.power = nextPower;
//             user.totalPoints -= fee;
//             await user.save();
//             return res.status(200).send(true);
//         }
//         else {
//             return res.status(404).send({ message: "User not found" });
//         }
//     } catch (err) {
//         handleError(err, res);
//     }
// });

exports.updateTask = catchAsync(async (req, res) => {
    let tgId = req.params.id;
    let { id, profit } = req.body;
    try {
        const user = await User.findOne({ tgId: tgId });
        console.log("update Task-----", id)
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
        // console.log("friend user ", user);

        let friends = user.friends;
        let friendsInfo = [];
        if (friends) {
            await Promise.all(friends.map(async (friend) => {
                let nFriend = await User.findOne({ tgId: friend.id });
                if (nFriend) {
                    friendsInfo.push({ Info: nFriend, revenue: friend.revenue });
                }
            }));
            // console.log("friend result", friendsInfo);

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
    console.log("tgId---------------------", tgId);

    let numUsers = parseInt(req.query.num);
    try {
        const topUsers = await User.find({}, { totalPoints: 1, userName: 1, tgId: 1, style: 1 }).sort({ totalPoints: -1 }).limit(numUsers);
        let curUser = await User.findOne({ tgId });
        let curUserIndex = await User.countDocuments({ totalPoints: { $gt: curUser.totalPoints } });
        // console.log("topUser", topUsers, "----------------", "curUser", curUser);
        return res.status(200).json({
            topUsers: topUsers,
            curUser: curUser,
            ranking: curUserIndex,
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

// exports.updateCountDown = catchAsync(async (req, res) => {
//     let tgId = req.params.id;
//     let { id } = req.body;
//     try {
//         const result = await User.findOneAndUpdate(
//             { tgId: tgId },
//             { $set: { intervalId: id } },
//             { new: true }
//         );
//         if (!result) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         return res.status(200).send(result);
//     } catch (err) {
//         handleError(err, res);
//     }
// });

// exports.updateDex = catchAsync(async (req, res) => {
//     const tgId = req.params.id;
//     let { dex } = req.body;
//     try {
//         const result = await User.findOneAndUpdate(
//             { tgId: tgId },
//             { $set: { dex: dex } },
//             { new: true }
//         );
//         if (!result) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         return res.status(200).send(result);
//     } catch (err) {
//         handleError(err, res);
//     }
// });

