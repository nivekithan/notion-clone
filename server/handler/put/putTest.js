const GrpQueModel = require("../../models/grpQueModel");

const putTest = (req, res) => {
  const id = req.query.id;

  GrpQueModel.findOne({ day_id: id }, (err, queDoc) => {
    if (err) {
      console.error(err);
      res.json(queDoc);
    } else {
      queDoc.data = req.body.data;
      queDoc.markModified("data");
      queDoc.save();
      res.json(queDoc);
    }
  });
};

module.exports = putTest;
