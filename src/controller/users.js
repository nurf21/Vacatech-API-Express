const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const jwt = require("jsonwebtoken");

const { getAllUser, checkUser } = require("../model/users");

module.exports = {
  getAllUser: async (request, response) => {
    try {
      const result = await getAllUser();
      return helper.response(response, 200, "Success Get All User", result);
      //   console.log(result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      //   console.log(error);
    }
  },
  loginUser: async (request, response) => {
    // if (
    //   request.body.user_email === undefined ||
    //   request.body.user_email === null ||
    //   request.body.user_email === ""
    // ) {
    //   return helper.response(response, 404, "Email must be filled");
    // } else if (
    //   request.body.user_password === undefined ||
    //   request.body.user_password === null ||
    //   request.body.user_password === ""
    // ) {
    //   return helper.response(response, 404, "Password must be filled");
    // }
    try {
      const { user_email, user_password } = request.body;
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          const {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          } = checkDataUser[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          };
          if (user_status == 0) {
            return helper.response(
              response,
              400,
              "Your Account is not Active, Please contact your Administrator"
            );
          } else {
            const token = jwt.sign(payload, "RAHASIA", { expiresIn: "6h" });
            payload = { ...payload, token };
            return helper.response(response, 200, "Success Login", payload);
          }
        } else {
          return helper.response(response, 400, "Wrong Password !");
        }
      } else {
        return helper.response(response, 400, "Email is not Registered !");
      }
    } catch (error) {
      //   return helper.response(response, 400, "Bad Request");
      console.log(error);
    }
  },
};
