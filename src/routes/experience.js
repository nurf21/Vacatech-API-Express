const router = require("express").Router()
const {
  getExpById,
  postExp,
  patchExp,
  deleteExp,
} = require("../controller/experience")

//GET
router.get("/:id", getExpById)

//POST
router.post("/", postExp);
router.patch("/:id", patchExp)

//DELETE
router.delete("/:id", deleteExp);

module.exports = router;
