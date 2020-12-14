const DayModel = require("../../models/dayModel");
const GrpQueModel = require("../../models/grpQueModel");

// DOMAIN/post/newGroup
const postNewGroup = (req, res) => {
  const grpQueDoc = new GrpQueModel();

  DayModel.findOne(
    { _id: process.env.TEST_DB_DAYS_ID },
    function (err, dayDoc) {
    
      if (err) {
        console.error(err);
        res.end();
      } else if (dayDoc) {
          // pushes the name and group_id to array in dayDoc
        dayDoc.days.push({
          name: req.body.name,
          group_id: grpQueDoc._id,
          tags: req.body.tags ? req.body.tags : [],
        });

        // figures out the id of the days and saves it in the newly created document
        // of grpQue
        const day_id = dayDoc.days[dayDoc.days.length - 1]._id;
        grpQueDoc.day_id = day_id;

        // saving the documents
        grpQueDoc.save();
        dayDoc.save();

      
        // Usefull for checking if it worked or not in postman
        res.send("It worked");
      } else {
        res.send("It should not happen");
      }
    }
  );
};

module.exports = postNewGroup;
