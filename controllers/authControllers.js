const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

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
    // const token = createToken(user._id);

    // res.cookie("jwt", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    //   maxAge: maxAge * 1000,
    // });

    res.status(201).json({ status: true,user });
  } catch (err) {
    console.log(err);
    // const errors = handleErrors(err);
    res.json({ err,status: false });
  }
};
module.exports.login = async (req, res,next) => {
  const { email, password } = req.body;
  console.log(email+'  -   '+password) 
  try {
    const user = await User.login(email, password);
    console.log(user);
    if(user){
    const token = createToken(user._id,user.email);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    
    res.status(200).json({ user, status: true,msg:'Login Scussflly'});
    }
    else
    return res.status(400).json({status:false,msg:"Wrong username or password !"})
    
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json({ errors, status: false ,msg:"something went wrong"});
  }
};
 