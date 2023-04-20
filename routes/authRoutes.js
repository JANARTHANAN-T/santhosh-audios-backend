const { register, login, viewuser, deleteuser, changepass, genotp, useotp } = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user",viewuser);
router.delete('/:id',deleteuser);
router.post('/changepass/:id',changepass)
router.post('/genotp',genotp)
router.post('/useotp',useotp)
module.exports = router;
