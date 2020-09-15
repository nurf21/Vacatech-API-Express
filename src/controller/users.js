const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const jwt = require("jsonwebtoken");

const { getAllUser, postUser, checkUser } = require("../model/users");

module.exports = {
  registerUser: async (request, response) => {
    console.log(request.body);
    const {
      user_email,
      user_password,
      user_name,
      user_phone,
      company_name,
      company_depart,
    } = request.body;
    const salt = bcrypt.genSaltSync(8); //(8)berapa kali password diacak
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    const checkEmail = await checkUser(user_email);
    if (checkEmail.length > 0) {
      return helper.response(response, 400, "Your email is already taken");
    } else {
      const setData = {
        // user_email : user_email karena sama namanya
        user_email,
        user_password: encryptPassword,
        user_name,
        user_img:
          request.file === undefined ? "blank.png" : request.file.filename,
        user_role: 2,
        user_phone,
        company_name,
        company_depart,
        user_created_at: new Date(),
        user_status: 1,
      };
      try {
        if (user_password.length < 8) {
          return helper.response(response, 400, "Minimum Eight Characters");
        } else if (!user_email.match("@")) {
          return helper.response(response, 400, "Invalid,Missing Character.");
        } else if (user_email === "") {
          return helper.response(response, 400, "Input Email,Please");
        } else if (user_name === "") {
          return helper.response(response, 400, "Input Username,Please");
        } else {
          const result = await postUser(setData);
          console.log(result);
          return helper.response(
            response,
            200,
            "Success Register User",
            result
          );
        }
      } catch (error) {
        return helper.response(response, 400, "Bad Request");
      }
    }
    // console.log(setData);
  },
  getAllUser: async (request, response) => {
    try {
      const result = await getAllUser();
      return helper.response(response, 200, "Success Get All User", result);
      //   console.log(result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      console.log(error);
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
            user_img,
            user_role,
            user_phone,
            company_name,
            company_depart,
            user_status,
          } = checkDataUser[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            user_img,
            user_role,
            user_phone,
            company_name,
            company_depart,
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
