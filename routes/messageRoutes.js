const { Router } = require("express");
const { newmag, allmsg } = require("../controllers/messageControllers");

const router = require('express').Router();
router.post('/new',newmag);
router.get('/all',allmsg);
// Router.put('/')
module.exports= router; 