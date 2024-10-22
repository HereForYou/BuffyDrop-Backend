var router = require("express").Router(),
  settingCtr = require("../controllers/setting.controller");

router.get("/all", settingCtr.getAllSetting);
router.put("/update/task/:id", settingCtr.updateTask);
router.put("/update/admin/:id", settingCtr.updateAdmin);
router.put("/update/dailyRevenue", settingCtr.updateDailyRevenue);
router.put("/update/inviteRevenue", settingCtr.updateInviteRevenue);
router.delete("/delete/task/:id", settingCtr.deleteTask);
router.delete("/delete/admin/:id", settingCtr.deleteAdmin);

// router.put("/update/levelStandard", settingCtr.updateLevelStandard);
// router.put("/update/timeLimit/:id", settingCtr.updateTimeLimit);
// router.delete("/delete/levelStandard/:id", settingCtr.deleteLevelStandard);
// router.delete("/delete/timeLimit/:id", settingCtr.deleteTimeLimit);
// router.delete("/delete/power/:id", settingCtr.deletePower);
// router.put("/update/power/:id", settingCtr.updatePower);
// router.put("/update/dex/img", settingCtr.updateDexImg);
// router.delete("/delete/dex/:id", settingCtr.deleteDex);

module.exports = router;
