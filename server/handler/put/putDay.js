const DayModel = require("../../models/dayModel");

const putDay = (req, res) => {
  const { id } = req.query;
  const { name, tags } = req.body;
  const putDayFun = (err, dayDoc) => {
    if (err) {
      console.error(err);
      res.end();
    } else if (dayDoc) {
      for (let index in dayDoc.days) {
        if (String(dayDoc.days[index]._id) === id) {
          dayDoc.days[index].name = name ? name : dayDoc.days[index].name;
          dayDoc.days[index].tags = tags ? tags : dayDoc.days[index].tags;
          dayDoc.save();
          res.json(dayDoc);
        }
      }
      res.end();
    }
  };

  DayModel.findOne({ _id: process.env.TEST_DB_DAYS_ID }, putDayFun);
};

module.exports = putDay;
