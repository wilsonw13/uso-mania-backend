const express = require("express");
const router = new express.Router();
const leaderBoardController = require("../Controllers/leaderBoardController");
const authController = require("../Controllers/authMiddleWare");

router.get(
 "/",
 leaderBoardController.middlewareSample,
 leaderBoardController.leaderBoard
);

router.get(
 "/auth",
 authController.authMiddleware,
 authController.authPage
);

// router.get("/user/:name", async (req, res) => {
//  try {
//   res.json(req.params.name);
//  } catch (error) {
//   console.log(error);
//  }
// });

module.exports = router;
