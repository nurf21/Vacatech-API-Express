const router = require("express").Router()
const {
  getPortfolioById,
  postPortfolio,
  patchPortfolio,
  deletePortfolio
} = require("../controller/portfolio")
const imageFolio = require("../middleware/multerFolio");

//GET
router.get("/:id", getPortfolioById)

//POST
router.post("/", imageFolio, postPortfolio)
router.patch("/:id", imageFolio, patchPortfolio)

//DELETE
router.delete("/:id", deletePortfolio);

module.exports = router
