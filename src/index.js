const routes = require("express").Router()

const users = require("./routes/users")
const profile = require("./routes/profile")
const experience = require("./routes/experience")
const skill = require("./routes/skill")
const portfolio = require("./routes/portfolio")
const company = require("./routes/companyProfile")

routes.use("/users", users)
routes.use("/profile", profile)
routes.use("/experience", experience)
routes.use("/skill", skill)
routes.use("/portfolio", portfolio)
routes.use("/company", company)

module.exports = routes
