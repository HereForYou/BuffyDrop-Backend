var router = require("express").Router(),
    userCtr = require("../controllers/user.controller");
// router.post("/joinTG/:id", userCtr.getJoin);
router.post("/:id", userCtr.getUser);
// router.put("/:id", userCtr.updatePoints);
// router.put("/level/:id", userCtr.updateLevel);
router.get("/friend/:id", userCtr.getFriends);

// router.put("/timeLimit/:id", userCtr.updateTimeLimit);
// router.put("/power/:id", userCtr.updatePower);

router.get("/all/:id", userCtr.getAllUsers);
router.get("/top/:id", userCtr.getTopUsers);
router.get("/totalcount", userCtr.getAllCount);

router.get("/all", userCtr.getAll);
// router.put("/update/admin/:id", userCtr.updateUser);

// router.get("/totalpoint", userCtr.getTotalPoints);
router.put("/task/:id", userCtr.updateTask);


module.exports = router;
