const router = require("express").Router();
const { getAllUser, loginUser } = require("../controller/users");

router.get("/", getAllUser);
router.post("/login", loginUser);

module.exports = router;
