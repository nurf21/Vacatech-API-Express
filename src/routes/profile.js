const router = require("express").Router()
const {
  getAllProfile,
  getProfileById,
  postProfile,
  patchProfile,
  deleteProfile,
} = require("../controller/profile")

router.get("/", getAllProfile)
router.get("/:id", getProfileById)

router.post("/", postProfile)

router.patch("/:id", patchProfile)

router.delete("/:id", deleteProfile)

module.exports = router;
