const express = require("express");
const router = express.Router();
const handler = require("../handler/index");

router.get("/days", (req, res) => {
  handler.getGroups(req, res);
});

router.get("/grpQue", (req, res) => {
  handler.getGrpQue(req, res)
})

module.exports = router;
