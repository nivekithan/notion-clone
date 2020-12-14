const mongoose = require("mongoose");

const grpQueSchema = mongoose.Schema({
  day_id: mongoose.Schema.Types.ObjectId,
  data:[
    {
      type: String,
      data: [
        {
          que: {},
          ans: {},
        }
      ]
    }
  ],
});

const GrpQueModel = mongoose.model("questions", grpQueSchema);

module.exports = GrpQueModel;
