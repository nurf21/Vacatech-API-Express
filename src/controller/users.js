const bcrypt = require("bcrypt")
const helper = require("../helper")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const qs = require("querystring")
const {
  getAllWorker,
  getAllUsers,
  getUserCount,
  getUsersByName,
  getUserById,
  postUser,
  checkUser,
  checkKey,
  changePassword,
  getCountWorker
} = require("../model/users")
const { postProfile, postProfileCompany, getProfileWorkerById } = require('../model/profile')
const { getSkillById } = require("../model/skill")
const { getPortfolioById } = require('../model/portfolio')
const { getExpById } = require('../model/experience')

module.exports = {
  getAllUsers: async (request, response) => {
    try {
      let { sort, page, limit } = request.query;
      if (sort === undefined || sort === null || sort === "") {
        sort = `user.user_id`;
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
      let totalData = await getUserCount();
      let totalPage = Math.ceil(totalData / limit);
      let offset = page * limit - limit;
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await getAllUsers(sort, limit, offset)
      return helper.response(response, 200, "Success get Users", result, pageInfo)
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getAllWorker: async (request, response) => {
    let { page, limit, sort } = request.query
    page === undefined || page === '' ? (page = 1) : (page = parseInt(page))
    limit === undefined || limit === '' ? (limit = 6) : (limit = parseInt(limit))
    const totalData = await getCountWorker(sort)
    if (sort === undefined || sort === null) {
      sort = 'user_id'
    }
    const totalPage = Math.ceil(totalData / limit)
    const offset = page * limit - limit
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData
    }
    try {
      const result = await getAllWorker(sort, limit, offset)
      for (let i = 0; i < result.length; i++) {
        result[i].profile = await getProfileWorkerById(result[i].user_id)
        result[i].skill = await getSkillById(result[i].user_id)
      }
      return helper.response(response, 200, 'Success Get Worker', result, pageInfo)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getUserById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getUserById(id)
      result[0].profile = await getProfileWorkerById(id)
      result[0].skill = await getSkillById(id)
      result[0].portfolio = await getPortfolioById(id)
      result[0].experience = await getExpById(id)
      return helper.response(response, 200, 'Get Id Success', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getAllUserByName: async (request, response) => {
    try {
      let { search } = request.query;
      if (search === undefined || search === null || search === "") {
        search = "%";
      } else {
        search = "%" + search + "%";
      }
      let page = parseInt(1)
      let limit = parseInt(40)
      let offset = page * limit - limit;
      const result = await getUsersByName(search, limit, offset);
      return helper.response(
        response,
        200,
        "Success Get Product Name",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  regWorker: async (request, response) => {
    const salt = bcrypt.genSaltSync(8)
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt)
    const checkEmail = await checkUser(request.body.user_email)
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_role: 1,
      user_phone: request.body.user_phone,
      company_name: "",
      company_depart: "",
      user_created_at: new Date(),
      user_status: 0,
    }
    try {
      if (checkEmail.length > 0) {
        return helper.response(response, 400, "Email is already registered")
      } else if (setData.user_phone.length < 10 || setData.user_phone.length > 13) {
        return helper.response(response, 400, "Invalid phone number")
      } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, "Password must be 8-16 characters")
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match")
      } else {
        const result = await postUser(setData)
        const setData2 = {
          user_id: result.id,
          profile_img: 'blank-profile.jpg',
          profile_job: '',
          profile_address: '',
          job_address: '',
          profile_desc: '',
          profile_created_at: new Date(),
        }
        const result2 = await postProfile(setData2)
        return helper.response(response, 200, "Success Register User")
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request")
    }
  },
  regRecruiter: async (request, response) => {
    const salt = bcrypt.genSaltSync(8)
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt)
    const checkEmail = await checkUser(request.body.user_email)
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_role: 2,
      user_phone: request.body.user_phone,
      company_name: request.body.company_name,
      company_depart: request.body.company_depart,
      user_created_at: new Date(),
      user_status: 0,
    }
    try {
      if (checkEmail.length > 0) {
        return helper.response(response, 400, "Email is already registered")
      } else if (setData.user_phone.length < 10 || setData.user_phone.length > 13) {
        return helper.response(response, 400, "Invalid phone number")
      } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, "Password must be 8-16 characters")
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match")
      } else {
        const result = await postUser(setData)
        const setData2 = {
          user_id: result.id,
          profile_img: 'blank-profile.jpg',
          profile_field: '',
          profile_city: '',
          profile_desc: '',
          profile_instagram: '',
          profile_linkedin: '',
          profile_created_at: new Date(),
        }
        const result2 = await postProfileCompany(setData2)
        return helper.response(response, 200, "Success Register User")
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, "Bad Request")
    }
  },
  loginUser: async (request, response) => {
    if (
      request.body.user_email === undefined ||
      request.body.user_email === ""
    ) {
      return helper.response(response, 400, "Email must be filled")
    } else if (
      request.body.user_password === undefined ||
      request.body.user_password === ""
    ) {
      return helper.response(response, 400, "Password must be filled")
    }
    try {
      const checkDataUser = await checkUser(request.body.user_email)
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          request.body.user_password,
          checkDataUser[0].user_password
        )
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
            user_status: checkDataUser[0].user_status,
          }
          if (payload.user_status === 0) {
            return helper.response(
              response,
              400,
              "Your account is not activated"
            );
          } else {
            const token = jwt.sign(payload, "RAHASIA", { expiresIn: "6h" })
            payload = { ...payload, token };
            return helper.response(response, 200, "Success login", payload)
          }
        } else {
          return helper.response(response, 400, "Wrong password !")
        }
      } else {
        return helper.response(response, 400, "Email is not registered !")
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request")
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { user_email } = request.body
      const keys = Math.round(Math.random() * 100000)
      const checkDataUser = await checkUser(user_email)
      if (checkDataUser.length >= 1) {
        const data = {
          user_key: keys,
          user_updated_at: new Date(),
        };
        await changePassword(data, user_email);
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        })
        await transporter.sendMail({
          from: '"Vacatech"',
          to: user_email,
          subject: "Vacatech - Forgot Password",
          html: `<a href="http://localhost:8080/setpassword?keys=${keys}">Click Here To Change Password</a>`,
        }),
          function (error) {
            if (error) {
              return helper.response(response, 400, "Email not sent !")
            }
          };
        return helper.response(response, 200, "Email has been sent !")
      } else {
        return helper.response(response, 400, 'Email is not registered !')
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  changePassword: async (request, response) => {
    try {
      const { keys } = request.query
      const { user_password } = request.body
      const checkDataUser = await checkKey(keys)
      if (
        request.query.keys === undefined ||
        request.query.keys === null ||
        request.query.keys === ""
      ) {
        return helper.response(response, 400, "Invalid Key");
      }
      if (checkDataUser.length > 0) {
        const email = checkDataUser[0].user_email
        let setData = {
          user_key: keys,
          user_password,
          user_updated_at: new Date(),
        }
        const difference =
          setData.user_updated_at - checkDataUser[0].user_updated_at
        const minutesDifference = Math.floor(difference / 1000 / 60)
        if (minutesDifference > 5) {
          const data = {
            user_key: "",
            user_updated_at: new Date(),
          };
          await changePassword(data, email);
          return helper.response(response, 400, "Key has expired")
        } else if (
          request.body.user_password === undefined ||
          request.body.user_password === null ||
          request.body.user_password === ""
        ) {
          return helper.response(response, 400, "Password must be filled !")
        } else if (
          request.body.confirm_password === undefined ||
          request.body.confirm_password === null ||
          request.body.confirm_password === ""
        ) {
          return helper.response(
            response,
            400,
            "Confirm Password must be filled !"
          )
        } else if (
          request.body.user_password.length < 8 ||
          request.body.user_password.length > 16
        ) {
          return helper.response(response, 400, "Password must be 8-16 characters")
        } else if (request.body.confirm_password !== request.body.user_password) {
          return helper.response(response, 400, "Password didn't match");
        } else {
          const salt = bcrypt.genSaltSync(10);
          const encryptPassword = bcrypt.hashSync(user_password, salt)
          setData.user_password = encryptPassword
          setData.user_key = ""
        }
        const result = await changePassword(setData, email)
        return helper.response(
          response,
          200,
          "Success Password Updated",
          result
        );
      } else {
        return helper.response(response, 404, `Invalid key`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  activationEmail: async (request, response) => {
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
          subject: "Vacatech - Activation Email",
          html: `<a href="http://localhost:8080/activate?keys=${keys}">Click Here To Activate Your Account</a>`,
        }),
          function (error) {
            if (error) {
              return helper.response(response, 400, 'Email not sent !')
            }
          }
        return helper.response(response, 200, 'Email has been sent !')
      } else {
        return helper.response(response, 400, 'Email is not registered !')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  activationUser: async (request, response) => {
    try {
      const { keys } = request.query;
      const checkDataUser = await checkKey(keys);
      if (
        request.query.keys === undefined ||
        request.query.keys === null ||
        request.query.keys === ""
      ) {
        return helper.response(response, 400, "Invalid Key");
      }
      if (checkDataUser.length > 0) {
        const email = checkDataUser[0].user_email
        let setData = {
          user_key: '',
          user_status: 1,
          user_updated_at: new Date(),
        };
        const result = await changePassword(setData, email);
        return helper.response(response, 200, "Success Activate Account", result);
      } else {
        return helper.response(response, 400, `Invalid key`);
      }
    } catch (error) {
      return helper.response(response, 404, "Bad Request", error)
    }
  },
};
