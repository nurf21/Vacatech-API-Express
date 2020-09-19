const router = require("express").Router()
const {
  getAllPortfolio,
  getPortfolioById,
  postPortfolio,
  patchPortfolio,
} = require("../controller/portfolio")
const uploadImage = require("../middleware/multer");

//GET
router.get("/", getAllPortfolio)
router.get("/:id", getPortfolioById)

//POST
router.post("/", uploadImage, postPortfolio)
router.patch("/:id",uploadImage, patchPortfolio)

module.exports = router
