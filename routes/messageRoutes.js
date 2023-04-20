const { newmag, allmsg, viewmsg, deletemsg, deleteAll } = require("../controllers/messageControllers");

const router = require('express').Router();
router.post('/',newmag);
router.get('/',allmsg);
router.put('/:id',viewmsg)
router.delete('/:id',deletemsg)
router.delete('/',deleteAll)
module.exports= router; 