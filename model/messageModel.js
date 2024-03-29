const { default: mongoose } = require("mongoose");

const messageSchema=new mongoose.Schema({
  email:{
    type: String,
    require: [true, "User needs to give email address"]
  },  
  name:{
    type: String,
    require: [true, "User needs to give Name"]
  },
  phonenumber:{
    type: String,
    require: [true, "User needs to give Phone number"]
  },  
  message:{
    type: String
  },
  status:{
    type:Boolean,
    default: false
  },
  totalBudget:String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  isquotation:{
    type:Boolean,
    default : false
  },
  materials:{
    type:Array,
    default :undefined
  }
})



module.exports = mongoose.model("Messages",messageSchema);