var router = require("express").Router(),
  userCtr = require("../controllers/user.controller");
  
router.post("/:id", userCtr.getUser);
router.post("/start/:id", userCtr.startFarming);
router.post("/end/:id", userCtr.endFarming);
router.post("/tap/:id", userCtr.updateTotalPoint); ///exit count,
router.get("/updatepoints/:id", userCtr.updatePoint); /////Claim
router.get("/friend/:id", userCtr.getFriends);
router.get("/top/:id", userCtr.getTopUsers);

// router.get("/all/:id", userCtr.getAllUsers);
// router.put("/level/:id", userCtr.updateLevel);
// router.put("/power/:id", userCtr.updatePower);
// router.post(${ ENDPOINT } / api / user / tap / ${ userId })
// router.post("/joinTG/:id", userCtr.getJoin);
// router.put("/updatecount/:id", userCtr.updateCount);///exit count,
// router.put("/timeLimit/:id", userCtr.updateTimeLimit);
// router.get("/totalcount", userCtr.getAllCount);
// router.get("/all", userCtr.getAll);
// router.put("/update/admin/:id", userCtr.updateUser);
// router.get("/totalpoint", userCtr.getTotalPoints);
// router.put("/task/:id", userCtr.updateTask);

module.exports = router;
