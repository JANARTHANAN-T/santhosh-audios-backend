const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Username is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  isadmin :{
    type:Boolean,
    default:false
  },
  deviceID: {
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  otp:{
    type : Number,
    default : undefined
  }, 
  lastlogin: {type: Date}
});

// password hashing 
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//login auth
userSchema.statics.login = async function (email, password ,deviceID) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      this.updateOne({_id:user._id},{deviceID:deviceID,lastlogin:Date.now},(err)=>{
        if (err)
          return false
      })
      return user;
    }
    return false
  }
  return false
};
// get all user
userSchema.statics.view = async function(){
  const user = await this.find({},{password:0})
  // console.log(user);
  return user;
}
// change password 
userSchema.statics.updatePass = async function (id,password){
  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);
  try {
    return this.updateOne({_id:id},{password:password})
  } catch (error) {
    return false
  }
}
module.exports = mongoose.model("Users", userSchema);
