const router = require("express").Router()
const {
  getAllSkill,
  getSkillById,
  postSkill,
  patchSkill,
} = require("../controller/skill")

//GET
router.get("/", getAllSkill)
router.get("/:id", getSkillById)

//POST
router.post("/", postSkill)
router.patch("/:id", patchSkill)

module.exports = router
