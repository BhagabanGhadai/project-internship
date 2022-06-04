const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "name is a required field",
      trim:true
    },
    email: {
      type: String,
      required: "email is a required field",
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      required: "mobile is a required field",
      unique: true,
    },
    collegeId: {
      type: ObjectId,
      ref: "College",
      trim:true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
