const express = require("express");
const router = express.Router();


const handler = require("../handler/index");

router.put("/day", (req, res) => {

    handler.putDay(req, res)
})


module.exports = router;