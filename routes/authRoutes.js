const { register, login, viewuser, deleteuser } = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user",viewuser);
router.delete('/:id',deleteuser)
module.exports = router;
