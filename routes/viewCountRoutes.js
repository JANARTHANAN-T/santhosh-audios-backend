const { increment } = require("../controllers/viewCountControllers");

const router = require('express').Router();
router.get('/',increment);
module.exports= router; 
