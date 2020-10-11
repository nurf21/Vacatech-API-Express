const router = require("express").Router()
const {
  getAllProfile,
  getProfileById,
  getProfileCompanyById,
  getProfileWorkerById,
  patchProfile,
  patchImageProfile,
} = require("../controller/profile")
const uploadImage = require("../middleware/multer");

router.get("/", getAllProfile)
router.get("/:id", getProfileById)
router.get("/company/:id", getProfileCompanyById)
router.get("/worker/:id", getProfileWorkerById)

router.patch("/worker/:id", patchProfile)
router.patch("/worker/image/:id",uploadImage, patchImageProfile)

module.exports = router;
