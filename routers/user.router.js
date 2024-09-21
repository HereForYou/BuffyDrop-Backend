var router = require("express").Router(),
    userCtr = require("../controllers/user.controller");
// router.post("/joinTG/:id", userCtr.getJoin);
router.post("/:id", userCtr.getUser);
router.put("/updatecount/:id", userCtr.updateCount);///exit count,
router.post("/start/:id", userCtr.startFarming);
// router.put("/tap/:id", userCtr.updateTotalPoint);///exit count,

// axios
//     .post(${ ENDPOINT } / api / user / tap / ${ userId })
router.get('/updatepoints/:id', userCtr.updatePoint);/////Claim
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
