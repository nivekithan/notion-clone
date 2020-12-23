const express = require("express");
const router = express.Router();
const handler = require("../handler/index");

router.get("/days", (req, res) => {
  handler.getGroups(req, res);
});

router.get("/test", (req, res) => {
  handler.getTest(req, res)
})

module.exports = router;
