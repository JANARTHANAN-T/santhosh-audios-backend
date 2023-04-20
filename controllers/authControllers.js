const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const Repos=require("../model/repoModel")
const generateOTP = require('../services/otpGen');
const { sendMail } = require("../services/sendMail");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id,email) => {
  return jwt.sign({ id,email }, process.env.jwtgenkey, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    // errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    // console.log(JSON.stringify(req.body.email))
    const user = await User.create({ username,email,password });

    res.status(201).json({ status: true,user });
  } catch (err) {
    console.log(err);
    // const errors = handleErrors(err);
    res.json({ err,status: false });
  }
};
module.exports.login = async (req, res,next) => {
  const { email, password,deviceID } = req.body;
  console.log({...req.body}) 
  try {
    const user = await User.login(email, password,deviceID);
    if(user){
    const token = createToken(user._id,user.email);
    // res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    
    res.status(200).json({ user, status: true,jwt:token,msg:'Login Successfully'});
    }
    else
    return res.status(400).json({status:false,msg:"Wrong username or password !"})
    
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json({ errors, status: false ,msg:"something went wrong"});
  }
};
 
module.exports.viewuser= async(req,res)=>{
  const user = await User.view();
  if(user){
    // console.log(user)
    res.status(200).json({status:true,users:user})
  }
  else{
    res.status(200).json({status:false,msg:"Users not found"})
  }
};

// delete user

module.exports.deleteuser= async(req,res)=>{
  const id =req.params.id;
  if(id){
    await User.deleteOne(({_id:id}))
      .then(async()=>{
        const users=await User.find({})
        res.status(200).json({status:true,msg:"Accound deletd sucessfully",users})
      })
      .catch(function(err){res.status(200).json({status:false,msg:"Users not found",err:err})})
    // re
  }
  else{
    res.status(200).json({status:false,msg:"Users not found"})
  }
}

//change password

module.exports.changepass= async(req,res)=>{
  const id =req.params.id;
  const {password}= req.body;
  if(id,password){
    const user = User.updatePass(id,password)
    if(user) {
      res.status(200).json({status:true,mag: "password change scssfully " })
    }
    else{
      res.status(200).json({status:false,msg:"something went wrong"})
    }
  }
  else{
    res.status(200).json({status:false,msg:"something went wrong"})
  }
}
module.exports.getotp= async(req,res)=>{
  try {
    
  const {email} = req.body;
  const otp = generateOTP()
  await User.updateOne({email:email},{$set :{otp:opt}})
  await sendMail(email,'Santhosh Audios | password reset | OTP',`Santhosh Audios  \n your one time password is ${otp} `)
  res.status(200).json({status:false,msg:"OTP generated"})
  
} catch (error) {
  console.log(error);
    res.status(200).json({status:false,msg:"unable to generate OTP"})
    
  }
}