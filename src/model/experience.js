const connection = require("../config/mysql")

module.exports = {
  getAllExp: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM experience", (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getExpById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM experience WHERE user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getExpByExpId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM experience WHERE exp_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postExp: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO experience SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              exp_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchExp: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE experience SET ? WHERE exp_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              exp_id: id,
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
  deleteExp: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM experience WHERE exp_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
}
