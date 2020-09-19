const router = require("express").Router()
const {
  getAllProfile,
  getProfileCompanyById,
  getProfileWorkerById,
  postProfile,
  patchProfile,
  deleteProfile,
} = require("../controller/profile")

router.get("/", getAllProfile)
router.get("/company/:id", getProfileCompanyById)
router.get("/worker/:id", getProfileWorkerById)

router.post("/", postProfile)

router.patch("/:id", patchProfile)

router.delete("/:id", deleteProfile)

module.exports = router;
