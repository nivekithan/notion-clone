const dayModel = require("../../models/dayModel");

const getGroups = (req, res) => {
  dayModel.findOne({ _id: process.env.TEST_DB_DAYS_ID }, function (err, days) {
    if (err) {
      console.log(err);
    } else if (days) {
      res.json(days);
    }
  });  
};

module.exports = getGroups;
