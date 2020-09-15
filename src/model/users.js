const connection = require('../config/mysql')

module.exports = {
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user', (error, result) => {
        // console.log(error)
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          resolve(new Error(error))
        }
      })
    })
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_email = ?', email, (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
