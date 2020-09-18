const router = require("express").Router()
const {
  getAllExp,
  getExpById,
  postExp,
  patchExp,
} = require("../controller/experience")

//GET
router.get("/", getAllExp)
router.get("/:id", getExpById)

//POST
router.post("/", postExp);
router.patch("/:id", patchExp)

module.exports = router;
