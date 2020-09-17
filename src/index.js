const routes = require("express").Router()

const users = require("./routes/users")
const profile = require("./routes/profile")
const experience = require("./routes/experience")
const skill = require("./routes/skill")
const portfolio = require("./routes/portfolio")

routes.use("/users", users)
routes.use("/profile", profile)
routes.use("/experience", experience)
routes.use("/skill", skill)
routes.use("/portfolio", portfolio)

module.exports = routes
