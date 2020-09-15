const connection = require("../config/mysql");

module.exports = {
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM user`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_email, user_password, user_name, user_img, user_role, user_status FROM user WHERE user_email = ?",
        email,
        (error, result) => {
          // console.log(error);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
