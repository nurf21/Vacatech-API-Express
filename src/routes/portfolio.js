const router = require("express").Router()
const {
  getAllPortfolio,
  getPortfolioById,
  postPortfolio,
  patchPortfolio,
  deletePortfolio
} = require("../controller/portfolio")
const imageFolio = require("../middleware/multerFolio");

//GET
router.get("/", getAllPortfolio)
router.get("/:id", getPortfolioById)

//POST
router.post("/", imageFolio, postPortfolio)
router.patch("/:id", imageFolio,patchPortfolio)

//DELETE
router.delete("/:id", deletePortfolio);

module.exports = router
