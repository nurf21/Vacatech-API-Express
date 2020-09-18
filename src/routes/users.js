const router = require("express").Router()
const {
  getAllUsers,
  getAllUserByName,
  getUsersById,
  loginUser,
  regWorker,
  regRecruiter,
  forgotPassword,
  changePassword,
} = require("../controller/users")

router.get("/", getAllUsers)
router.get("/search", getAllUserByName);
router.get("/:id", getUsersById)

router.post("/login", loginUser)
router.post("/register/worker", regWorker)
router.post("/register/recruiter", regRecruiter)
router.post("/forgot", forgotPassword)
router.patch("/change", changePassword)

module.exports = router
