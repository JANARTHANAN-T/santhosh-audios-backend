const { register, login, viewuser, deleteuser, changepass, getotp } = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user",viewuser);
router.delete('/:id',deleteuser);
router.post('/changepass/:id',changepass)
router.post('/genotp',getotp)
// router.post('/useotp',forgotpass)
module.exports = router;
