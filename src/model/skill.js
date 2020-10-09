const connection = require("../config/mysql")

module.exports = {
  getAllSkill: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM skill", (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getSkillById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM skill WHERE user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      )
    })
  },
  postSkill: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO skill SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            skill_id: result.insertId,
            ...setData,
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchSkill: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE skill SET ? WHERE skill_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              skill_id: id,
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
  getSkillBySkillId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM skill WHERE skill_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteSkill: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM skill WHERE skill_id = ?",
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
