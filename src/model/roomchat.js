const connection = require("../config/mysql")

module.exports = {
    getMessageByUserId: (id) => {
        return new Promise((resolve, reject) => {
          connection.query(
            "SELECT * FROM messages WHERE user_id = ?",
            id,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          )
        })
    },
    getMessageChatByRoom: (roomId) => {
        return new Promise((resolve, reject) => {
          connection.query(
            "SELECT * FROM messages WHERE roomchat_id = ?",
            roomId,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          )
        })
    },
    getRecentMessage: (recent) => {
        return new Promise((resolve, reject) => {
          connection.query(
            "SELECT * FROM messages WHERE user_id = ? ORDER BY msg_created_at DESC LIMIT 1",
            recent,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          )
        })
    },
    postRoomChat: (setData) => {
        return new Promise((resolve, reject) => {
          connection.query("INSERT INTO roomchat SET ?", setData, (error, result) => {
            if (!error) {
              const newResult = {
                id: result.insertId,
                ...setData,
              }
              resolve(newResult)
            } else {
              reject(new Error(error))
            }
          })
        })
    },
    postMessage: (setData) => {
        return new Promise((resolve, reject) => {
          connection.query("INSERT INTO messages SET ?", setData, (error, result) => {
            if (!error) {
              const newResult = {
                msg_id: result.insertId,
                ...setData,
              }
              resolve(newResult)
            } else {
              reject(new Error(error))
            }
          })
        })
    },
}