const { addRepo } = require('../controllers/gitControllers');

const router = require('express').Router();

router.post('/addRepo',addRepo );

module.exports =router;