const router = require("express").Router();
const { getAllUser, loginUser, registerUser } = require("../controller/users");

router.get("/", getAllUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
