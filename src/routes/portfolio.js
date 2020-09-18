const router = require("express").Router()
const {
  getAllPortfolio,
  getPortfolioById,
  postPortfolio,
  patchPortfolio,
} = require("../controller/portfolio")

//GET
router.get("/", getAllPortfolio)
router.get("/:id", getPortfolioById)

//POST
router.post("/", postPortfolio)
router.patch("/:id", patchPortfolio)

module.exports = router
