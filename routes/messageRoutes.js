const { newmag, allmsg, viewmsg } = require("../controllers/messageControllers");

const router = require('express').Router();
router.post('/',newmag);
router.get('/',allmsg);
router.put('/:id',viewmsg)
module.exports= router; 