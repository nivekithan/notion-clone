const grpQueModel = require("../../models/grpQueModel");

const getTest = (req, res) => {

    grpQueModel.findOne({day_id : req.query.day_id}, (err, grpQueDoc) => {
        if (err) {  
            console.error(err)
            res.end()
        } else if (grpQueDoc) {
            // console.log(grpQueDoc)
            res.json(grpQueDoc)
        }
    })


}

module.exports = getTest;