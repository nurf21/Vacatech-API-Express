const connection = require("../config/mysql")

module.exports = {
    getMessageByUserId: (id) => {
        return new Promise((resolve, reject) => {
          connection.query(
            "SELECT * FROM messages LEFT JOIN user ON messages.user_id = user.user_id WHERE messages.user_id = ?",
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
    getLatestMessageByRoom: (roomId) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM messages WHERE roomchat_id = ? ORDER BY msg_created_at DESC LIMIT 1",
          roomId,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error));
          }
        )
      })
  },
    getRoomChatById: (id) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM roomchat JOIN user ON roomchat.user_id = user.user_id WHERE roomchat.user_id = ?",
          id,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error));
          }
        )
      })
    },
    getIdFromRoomchat: (id) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM roomchat WHERE roomchat_id = ?",
          id,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error));
          }
        )
      })
    },
    getNotificationById: (id) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM notification WHERE user_id = ? AND status = 0",
          id,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error));
          }
        )
      })
    },
    getUnseenNotification: (id) => {
      return new Promise((resolve, reject) => {
        connection.query(
          'SELECT COUNT(*) AS count FROM notification WHERE user_id = ? AND status = 0', id, (error, result) => {
            !error ? resolve(result[0].count) : reject(new Error(error))
          }
        )
      })
    },
    patchNotification: (id, setData) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE notification SET ? WHERE user_id = ?', [setData, id], (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        })
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
    postNotification: (setData) => {
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO notification SET ?", setData, (error, result) => {
          if (!error) {
            const newResult = {
              notif_id: result.insertId,
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