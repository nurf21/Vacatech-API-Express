const router = require("express").Router()
const {
  getCompanyProfile,
  getCompanyProfileById,
  postCompanyProfile,
  patchCompanyProfile,
  deleteCompanyProfile,
} = require("../controller/companyProfile")
const uploadImage = require("../middleware/multer");

router.get("/", getCompanyProfile)
router.get("/:id", getCompanyProfileById)

router.post("/",uploadImage, postCompanyProfile)

router.patch("/:id",uploadImage, patchCompanyProfile)

router.delete("/:id", deleteCompanyProfile)

module.exports = router;