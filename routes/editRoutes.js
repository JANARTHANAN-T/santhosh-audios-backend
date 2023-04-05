const { getdata, savedata } = require('../controllers/editeControllers');
const { auth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/data',getdata );
router.put('/data',savedata);

module.exports =router;