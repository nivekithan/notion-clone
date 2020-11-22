const express = require("express");
const router = express.Router();
const handler = require("../handler/index");

router.get("/days", (req, res) => {
    handler.getGroups(req, res)
});


module.exports = router