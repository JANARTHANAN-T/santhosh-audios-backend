const { pushRepo } = require('../controllers/gitControllers');

const router = require('express').Router();

router.post('/push',pushRepo );

module.exports =router;