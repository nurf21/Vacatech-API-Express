const router = require("express").Router()
const {
  getAllProfile,
  getProfileCompanyById,
  postProfile,
  patchProfile,
  deleteProfile,
} = require("../controller/profile")

router.get("/", getAllProfile)
router.get("/company/:id", getProfileCompanyById)

router.post("/", postProfile)

router.patch("/:id", patchProfile)

router.delete("/:id", deleteProfile)

module.exports = router;
