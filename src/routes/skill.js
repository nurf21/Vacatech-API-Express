const router = require("express").Router()
const {
  getSkillById,
  postSkill,
  patchSkill,
  deleteSkill
} = require("../controller/skill")

//GET
router.get("/:id", getSkillById)

//POST
router.post("/", postSkill)
router.patch("/:id", patchSkill)

//DELETE
router.delete("/:id", deleteSkill);

module.exports = router
