const router = require("express").Router();
const {
  getAllUser,
  loginUser,
  regWorker,
  regRecruiter,
} = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

router.get("/", authorization2, getAllUser);
router.post("/login", loginUser);
router.post("/register/worker", regWorker);
router.post("/register/recruiter", regRecruiter);
// router.post('/register', registerUser)

module.exports = router;
