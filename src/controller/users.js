const bcrypt = require('bcrypt')
const helper = require('../helper/index')
const jwt = require('jsonwebtoken')

const { postUser, checkUser } = require('../model/users')

module.exports = {
  regWorker: async (request, response) => {
    const salt = bcrypt.genSaltSync(8)
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt)
    const checkEmail = await checkUser(request.body.user_email)
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_img: 'blank-profile.jpg',
      user_role: 1,
      user_phone: request.body.user_phone,
      company_name: '',
      company_depart: '',
      user_created_at: new Date(),
      user_status: 0
    }
    try {
      if (!setData.user_email.match('@')) {
        return helper.response(response, 400, 'Invalid missing character')
      } else if (checkEmail.length > 0) {
        return helper.response(response, 400, 'Email is already registered')
      } else if (setData.user_phone.length < 10 || setData.user_phone.length < 13) {
        return helper.response(response, 400, 'Invalid phone number')
      } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, 'Password must be 8-16 characters')
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match")
      } else {
        const result = await postUser(setData)
        return helper.response(response, 200, 'Success Register User', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
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
      user_img: 'blank-profile.jpg',
      user_role: 2,
      user_phone: request.body.user_phone,
      company_name: request.body.company_name,
      company_depart: request.body.company_depart,
      user_created_at: new Date(),
      user_status: 0
    }
    try {
      if (!setData.user_email.match('@')) {
        return helper.response(response, 400, 'Invalid missing character')
      } else if (checkEmail.length > 0) {
        return helper.response(response, 400, 'Email is already registered')
      } else if (setData.user_phone.length < 10 || setData.user_phone.length > 13) {
        return helper.response(response, 400, 'Invalid phone number')
      } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, 'Password must be 8-16 characters')
      } else if (request.body.confirm_password !== request.body.user_password) {
        return helper.response(response, 400, "Password didn't match")
      } else {
        const result = await postUser(setData)
        return helper.response(response, 200, 'Success Register User', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
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
  }
}
