const router = require("express").Router()
const {
  getAllProfile,
  getProfileById,
  getProfileCompanyById,
  getProfileWorkerById,
  postProfile,
  patchProfile,
  deleteProfile,
} = require("../controller/profile")
const uploadImage = require("../middleware/multer");

router.get("/", getAllProfile)
router.get("/:id", getProfileById)
router.get("/company/:id", getProfileCompanyById)
router.get("/worker/:id", getProfileWorkerById)

router.post("/",uploadImage, postProfile)

router.patch("/:id",uploadImage, patchProfile)

router.delete("/:id", deleteProfile)

module.exports = router;
