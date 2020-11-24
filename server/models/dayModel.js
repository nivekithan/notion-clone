const mongoose = require("mongoose");

const daySchema = mongoose.Schema({
  name: { type: String, default: "days" },
  days: [
    {
      name: String,
      group_id: mongoose.Schema.Types.ObjectId,
      tags: [{type: String}]
    },
  ],
});

const DayModel = mongoose.model("days", daySchema);

module.exports = DayModel;
