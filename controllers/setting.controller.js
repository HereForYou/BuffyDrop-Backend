process.env.NODE_ENV = process.env.NODE_ENV || "development";
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

var mongoose = require("mongoose"),
    Setting = mongoose.model("Setting");
const handleError = require("../config/utils/handleError");
const catchAsync = require("../config/utils/catchAsync");

exports.updateLevelStandard = catchAsync(async (req, res) => {
    let newSetting = req.body;
    let level = newSetting.level;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.levelStandard[level - 1] = newSetting;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateTask = catchAsync(async (req, res) => {
    let index = req.params.id;
    let newTask = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.taskList[index] = newTask;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateTimeLimit = catchAsync(async (req, res) => {
    let index = req.params.id;
    let newTimeLimit = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.dailyTimeLimitList[index] = newTimeLimit;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updatePower = catchAsync(async (req, res) => {
    let index = req.params.id;
    let newPower = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.powerList[index] = newPower;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateAdmin = catchAsync(async (req, res) => {
    let index = req.params.id;
    let newAdmin = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.admin[index] = newAdmin;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateDailyRevenue = catchAsync(async (req, res) => {
    let { newRevenue } = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.dailyRevenue = newRevenue;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateInviteRevenue = catchAsync(async (req, res) => {
    let { newRevenue } = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.inviteRevenue = newRevenue;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.deleteLevelStandard = catchAsync(async (req, res) => {
    let levelToRemove = req.params.id;
    try {
        await Setting.updateOne(
            {},
            { $pull: { levelStandard: { level: levelToRemove } } },
            { multi: false } // Only update the first document that matches the filter
        );
        // Refresh the document to reflect the changes
        let settingDoc = await Setting.findOne();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.deleteTask = catchAsync(async (req, res) => {
    let idToRemove = req.params.id;
    try {
        let settingDoc = await Setting.findOne();
        let taskList = settingDoc.taskList;
        taskList.splice(idToRemove, 1);
        settingDoc.taskList = taskList;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.deleteTimeLimit = catchAsync(async (req, res) => {
    let idToRemove = req.params.id;
    try {
        let settingDoc = await Setting.findOne();
        let dailyTimeLimitList = settingDoc.dailyTimeLimitList;
        dailyTimeLimitList.splice(idToRemove, 1);
        settingDoc.dailyTimeLimitList = dailyTimeLimitList;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.deletePower = catchAsync(async (req, res) => {
    let idToRemove = req.params.id;
    try {
        let settingDoc = await Setting.findOne();
        let powerList = settingDoc.powerList;
        powerList.splice(idToRemove, 1);
        settingDoc.powerList = powerList;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.deleteAdmin = catchAsync(async (req, res) => {
    let idToRemove = req.params.id;
    try {
        let settingDoc = await Setting.findOne();
        let admin = settingDoc.admin;
        admin.splice(idToRemove, 1);
        settingDoc.admin = admin;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.getAllSetting = catchAsync(async (req, res) => {
    try {
        const setting = await Setting.findOne();
        return res.status(200).send(setting);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateDex = catchAsync(async (req, res) => {
    let index = req.params.id;
    let newDex = req.body;
    try {
        let settingDoc = await Setting.findOne();
        settingDoc.dexList[index] = newDex;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});

exports.updateDexImg = catchAsync(async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/uploads');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {

        if (err) {
            return res.status(400).send({ message: "Error parsing form-data" });
        }
        const dexId = parseInt(fields.id);
        const name = fields.name[0];
        const file = files.img;
        if (!dexId || !name) {
            return res.status(400).send({ message: "ID and Name are required" });
        }
        let setting = await Setting.findOne();

        if (!setting) {
            setting = new Setting();
        }
        let dexToUpdate = setting.dexList.find(dex => dex.id === dexId);
        if (file) {
            const fileJson = JSON.parse(JSON.stringify(file[0]));
            const fileExtension = path.extname(fileJson.originalFilename);
            const filePath = path.basename(fileJson.filepath) + fileExtension;

            const newFilePath = path.join(form.uploadDir, path.basename(fileJson.filepath) + fileExtension);
            fs.renameSync(fileJson.filepath, newFilePath);
            if (dexToUpdate) {
                if (dexToUpdate.img && fs.existsSync(path.join(__dirname, '../public/uploads/', dexToUpdate.img))) {
                    fs.unlinkSync(path.join(__dirname, '../public/uploads/', dexToUpdate.img));
                }
                dexToUpdate.img = 'uploads/' + filePath;
                dexToUpdate.name = name;
            } else {
                const newDex = {
                    id: dexId,
                    name: name,
                    img: 'uploads/' + filePath
                };
                setting.dexList.push(newDex);
            }
        }
        else {
            if (dexToUpdate) {
                dexToUpdate.name = name;
            } else {
                const newDex = {
                    id: dexId,
                    name: name,
                };
                setting.dexList.push(newDex);
            }
        }
        await setting.save();

        res.status(200).send(setting);
    });
})

exports.deleteDex = catchAsync(async (req, res) => {
    let idToRemove = req.params.id;
    try {
        let settingDoc = await Setting.findOne();
        let dexList = settingDoc.dexList;
        dexList.splice(idToRemove, 1);
        settingDoc.dexList = dexList;
        await settingDoc.save();
        return res.status(200).send(settingDoc);
    } catch (err) {
        handleError(err, res);
    }
});