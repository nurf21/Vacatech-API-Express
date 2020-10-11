const router = require("express").Router()
const {
  getCompanyProfileById,
  postCompanyProfile,
  patchCompanyProfile,
  patchImageCompanyProfile
} = require("../controller/companyProfile")
const uploadImage = require("../middleware/multer");

router.get("/:id", getCompanyProfileById)

router.post("/",uploadImage, postCompanyProfile)

router.patch("/:id", patchCompanyProfile)
router.patch("/image/:id",uploadImage, patchImageCompanyProfile)

module.exports = router;