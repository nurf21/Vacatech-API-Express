const connection = require("../config/mysql")

module.exports = {
  getProfile: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM profile WHERE profile_name LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getProfileCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM profile",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProfileById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM profile WHERE profile_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postProfile: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO profile SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              profile_id: result.insertId,
              ...setData,
            };
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchProfile: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE profile SET ? WHERE profile_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              profile_id: id,
              ...setData,
            };
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteProfile: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM profile WHERE profile_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
            };
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
}
