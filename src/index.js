const routes = require("express").Router();

const users = require("./routes/users");
const profile = require("./routes/profile");

routes.use("/users", users);
routes.use("/profile", profile);

module.exports = routes;
