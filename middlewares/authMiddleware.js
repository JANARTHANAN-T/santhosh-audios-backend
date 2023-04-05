const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

module.exports.auth =async (req, res, next) => {
  const token = req.cookies.jwt || req.body.jwt ||undefined;
  // next();
  if (token) {
    console.log('auth');
    jwt.verify(
      token,
      process.env.jwtgenkey,
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false ,mass: err});
          // next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user){
            req.body.userdata={status: true, user: user.email};
            next();

            // res.json({});
          }
          else res.json({ status: false ,mss:"User not found" });
          // next();
        }
      }
    );
  } else {
    res.json({ status: false ,msg :"session timeout , pls login" });
    // next();
  }
};
