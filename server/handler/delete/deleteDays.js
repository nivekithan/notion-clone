const { model } = require("../../models/dayModel");
const dayModel = require("../../models/dayModel");

// delete/days?id=<mongdbId>
const deleteDays  = (req, res) => {
    dayModel.findOne({_id : process.env.TEST_DB_DAYS_ID}, (err, dayDoc) => {
        if (err) {
            console.error(err);
            res.end();
            return;
        } else if (dayDoc) {
            for (let i  in dayDoc.days) {
                if (String(dayDoc.days[i]._id) === req.query.id) {
                    dayDoc.days.splice(i,1);
                    dayDoc.save()
                    res.json(dayDoc)
                } 
            } 
        }
    })
}

module.exports = deleteDays;