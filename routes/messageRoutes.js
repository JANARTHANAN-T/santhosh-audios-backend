const { newmag, allmsg, viewmsg, deleteallmag, deletemsg } = require("../controllers/messageControllers");

const router = require('express').Router();
router.post('/',newmag);
router.get('/',allmsg);
router.put('/:id',viewmsg)
router.delete('/',deleteallmag)
router.delete('/:id',deletemsg)

module.exports= router; 