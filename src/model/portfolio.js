const connection = require("../config/mysql");

module.exports = {
  getAllPortfolio: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM portfolio", (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getPortfolioById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM portfolio WHERE user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postPortfolio: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO portfolio SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              portfolio_id: result.insertId,
              ...setData,
            }
            resolve(newResult)
          } else {
            console.log(error)
            // reject(new Error(error));
          }
        }
      )
    })
  },
  patchPortfolio: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE portfolio SET ? WHERE portfolio_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              portfolio_id: id,
              ...setData,
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
}
