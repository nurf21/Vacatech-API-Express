const router = require("express").Router()
const {
  getAllSkill,
  getSkillById,
  postSkill,
  patchSkill,
  deleteSkill
} = require("../controller/skill")

//GET
router.get("/", getAllSkill)
router.get("/:id", getSkillById)

//POST
router.post("/", postSkill)
router.patch("/:id", patchSkill)

//DELETE
router.delete("/:id", deleteSkill);

module.exports = router
