const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const repoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"]
  },
  reponame:{
    type:String,
    required:[true,"Repository name is Required"]
  },
  lastCloneTime: {
    type: Date
  },
  lastCommitTime:{
    type: Date
  },
  lastPushTime:{
    type: Date
  }
});

module.exports = mongoose.model("Repos", repoSchema);
