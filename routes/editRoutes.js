const { getdata, savedata } = require('../controllers/editeControllers');
const { update } = require('../controllers/gitControllers');

const router = require('express').Router();

router.get('/data',getdata);
router.put('/data',savedata);
router.put('/update',update);

module.exports =router;