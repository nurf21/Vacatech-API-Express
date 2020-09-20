const router = require("express").Router()
const {
  getCompanyProfile,
  getCompanyProfileById,
  postCompanyProfile,
  patchCompanyProfile,
  patchImageCompanyProfile,
  deleteCompanyProfile,
} = require("../controller/companyProfile")
const uploadImage = require("../middleware/multer");

router.get("/", getCompanyProfile)
router.get("/:id", getCompanyProfileById)

router.post("/",uploadImage, postCompanyProfile)

router.patch("/:id", patchCompanyProfile)
router.patch("/image/:id",uploadImage, patchImageCompanyProfile)

router.delete("/:id", deleteCompanyProfile)

module.exports = router;