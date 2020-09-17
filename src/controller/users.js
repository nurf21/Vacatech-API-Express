const bcrypt = require('bcrypt')
const helper = require('../helper')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const { getAllUser, getUserById, postUser, checkUser, checkKey, changePassword } = require("../model/users");

module.exports = {
  getAllUser: async (request, response) => {
    let { sort, page, limit } = request.query;
    if (sort === undefined || sort === null || sort === "") {
      sort = `user_id`;
    }
    if (page === undefined || page === null || page === "") {
      page = parseInt(1);
    } else {
      page = parseInt(page);
    }
    if (limit === undefined || limit === null || limit === "") {
      limit = parseInt(9);
    } else {
      limit = parseInt(limit);
    }
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let limits = page * limit;
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };
    try {
      const result = await getAllUser(sort, limit, offset);
      return helper.response(response, 200, "Success Get All User", result, pageInfo);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getUserById(id);
      if (result.length > 0) {
        return helper.response(response, 200, "Success Get User By Id", result);
      } else {
        return helper.response(response, 404, `User By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  regWorker: async (request, response) => {
    const salt = bcrypt.genSaltSync(8);
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt);
    const checkEmail = await checkUser(request.body.user_email);
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_img: "blank-profile.jpg",
      user_role: 1,
      user_phone: request.body.user_phone,
      company_name: "",
      company_depart: "",
      user_created_at: new Date(),
      user_status: 0,
    };
    try {
      if (!setData.user_email.match("@")) {
        return helper.response(response, 400, "Invalid missing character");
      } else if (checkEmail.length > 0) {
        return helper.response(response, 400, 'Email is already registered')
      } else if (setData.user_phone.length < 10 || setData.user_phone.length > 13) {
        return helper.response(response, 400, 'Invalid phone number')
      } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, 'Password must be 8-16 characters')
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match");
      } else {
        const result = await postUser(setData);
        return helper.response(response, 200, "Success Register User", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  regRecruiter: async (request, response) => {
    const salt = bcrypt.genSaltSync(8);
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt);
    const checkEmail = await checkUser(request.body.user_email);
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_img: 'blank-profile.jpg',
      user_role: 2,
      user_phone: request.body.user_phone,
      company_name: request.body.company_name,
      company_depart: request.body.company_depart,
      user_created_at: new Date(),
      user_status: 0,
    };
    try {
      if (!setData.user_email.match("@")) {
        return helper.response(response, 400, "Invalid missing character");
      } else if (checkEmail.length > 0) {
        return helper.response(response, 400, "Email is already registered");
      } else if (
        setData.user_phone.length < 10 ||
        setData.user_phone.length > 13
      ) {
        return helper.response(response, 400, "Invalid phone number");
      } else if (
        request.body.user_password.length < 8 ||
        request.body.user_password.length > 16
      ) {
        return helper.response(
          response,
          400,
          "Password must be 8-16 characters"
        );
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match");
      } else {
        const result = await postUser(setData);
        return helper.response(response, 200, "Success Register User", result);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    if (request.body.user_email === undefined || request.body.user_email === '') {
      return helper.response(response, 400, 'Email must be filled')
    } else if (request.body.user_password === undefined || request.body.user_password === '') {
      return helper.response(response, 400, 'Password must be filled')
    }
    try {
      const checkDataUser = await checkUser(request.body.user_email)
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(request.body.user_password, checkDataUser[0].user_password)
        if (checkPassword) {
          let payload = {
            user_id: checkDataUser[0].user_id,
            user_email: checkDataUser[0].user_email,
            user_name: checkDataUser[0].user_name,
            user_img: checkDataUser[0].user_img,
            user_role: checkDataUser[0].user_role,
            user_phone: checkDataUser[0].user_phone,
            company_name: checkDataUser[0].company_name,
            company_depart: checkDataUser[0].company_depart,
            user_status: checkDataUser[0].user_status
          }
          if (payload.user_status === 0) {
            return helper.response(response, 400, 'Your account is not activated')
          } else {
            const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '6h' })
            payload = { ...payload, token }
            return helper.response(response, 200, 'Success login', payload)
          }
        } else {
          return helper.response(response, 400, 'Wrong password !')
        }
      } else {
        return helper.response(response, 400, 'Email is not registered !')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { user_email } = request.body;
      const keys = Math.round(Math.random() * 100000);
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length >= 1) {
        const data = {
          user_key: keys,
          user_updated_at: new Date()
        }
        await changePassword(data, user_email)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS
          }
        })
        await transporter.sendMail({
          from: '"Vacatech"',
          to: user_email,
          subject: "Vacatech - Forgot Password",
          html: 
          `<h1>Request to Reset Your Account Password</h1>
          <p>The following is the button for you to reset the password.</p>
          <a href="http://localhost:8080/changePassword?keys=${keys}">Change Password</a>`,
        }),
        function (error) {
          if (error) {
            return helper.response(response, 400, 'Email not sent !')
          }
        }
        return helper.response(response, 200, 'Email has been sent !')
      } else {
        return helper.response(response, 400, 'Email is not Registered !')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  changePassword: async (request, response) => {
    try {
      const { keys } = request.query;
      const { user_password } = request.body;
      const checkDataUser = await checkKey(keys);
      if (
        request.query.keys === undefined ||
        request.query.keys === null ||
        request.query.keys === ""
      ) {
        return helper.response(response, 400, "Wrong key !");
      }
      if (checkDataUser.length > 0) {
        const email = checkDataUser[0].user_email
        let setData = {
          user_key:keys,
          user_password,
          user_updated_at: new Date(),
        };
        const difference = setData.user_updated_at - checkDataUser[0].user_updated_at;
        const minutesDifference = Math.floor(difference/1000/60);
        if (minutesDifference > 5){
           const data = {
            user_key: "",
            user_updated_at: new Date()
           }
           await changePassword(data, email)
           return helper.response(response, 400, "Key has expired")
        } else if (
          request.body.user_password === undefined ||
          request.body.user_password === null ||
          request.body.user_password === ""
        ) {
          return helper.response(response, 400, "Password must be filled !");
        } else if (
          request.body.confirm_password === undefined ||
          request.body.confirm_password === null ||
          request.body.confirm_password === "")
        {
          return helper.response(response, 400, "Confirm Password must be filled !");
        } else if (
          request.body.user_password.length < 8 ||
          request.body.user_password.length > 16
        ) {
          return helper.response(response, 400, "Password must be 8-16 characters")
        }else if (request.body.confirm_password !== request.body.user_password) {
          return helper.response(response, 400, "Password didn't match");
        } else {
          const salt = bcrypt.genSaltSync(10);
          const encryptPassword = bcrypt.hashSync(user_password, salt);
          setData.user_password = encryptPassword;
          setData.user_key = ""
        }
        const result = await changePassword(setData, email);
        return helper.response(response, 200, "Success Password Updated", result);
      } else {
        return helper.response(response, 404, `Key Not Found !`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  }
}
