const router = require("express").Router()
const {
  getAllProfile,
  getProfileCompanyById,
  postProfile,
  patchProfile,
  deleteProfile,
} = require("../controller/profile")
const uploadImage = require("../middleware/multer");

router.get("/", getAllProfile)
router.get("/company/:id", getProfileCompanyById)

router.post("/",uploadImage, postProfile)

router.patch("/:id", patchProfile)

router.delete("/:id", deleteProfile)

module.exports = router;
