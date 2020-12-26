const express = require("express");
const router = express.Router();

const handler = require("../handler/index");

// makes new group
router.delete("/days", (req, res) => {

    // deletes 
    handler.deleteDays(req, res)
}
)

module.exports = router;
