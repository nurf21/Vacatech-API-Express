const { 
  getMessageChatByRoom, 
  getMessageByUserId, 
  getNotificationById,
  getRoomChatById, 
  postRoomChat, 
  postMessage,
  postNotification
} = require("../model/roomchat")

const helper = require("../helper/index")
const { request, response } = require("express")

module.exports = {
  getMessageByUserId: async (request, response) => {
    try {
      const { user_id } = request.body;
      const result = await getMessageByUserId(user_id)
      if (result.length > 0) {
        return helper.response(response, 200, "Succes get Message By User Id", result)
      } else {
        return helper.response(response, 404, `Message By Id : ${user_id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  //get roomchat by user id
  getRoomChatById: async (request, response) => {
    try {
      const { user_id } = request.params
      const result = await getRoomChatById(user_id)
      if (result.length > 0) {
        return helper.response(response, 200, "Succes get Roomchat By User Id", result)
      } else {
        return helper.response(response, 404, `Message By Id : ${user_id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getMessageChatByRoom: async (request, response) => {
    try {
      const { roomchat_id } = request.params;
      const result = await getMessageChatByRoom(roomchat_id)
      if (result.length > 0) {
        return helper.response(response, 200, "Success get Message By Roomchat Id", result)
      } else {
        return helper.response(response, 404, `Message By Id : ${roomchat_id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getNotificationById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getNotificationById(id)
      if (result.length > 0) {
        return helper.response(response, 200, "Succes get Notification By User Id", result)
      } else {
        return helper.response(response, 404, `Notification By Id : ${user_id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  postRoomChat: async (request, response) => {
    try {
    const {user_worker, user_recruiter, msg} = request.body
    if (
        request.body.user_worker === undefined ||
        request.body.user_worker === null ||
        request.body.user_worker === ""
      ) {
        return helper.response(response, 404, "user worker must be filled");
      } else if (
        request.body.user_recruiter === undefined ||
        request.body.user_recruiter === null ||
        request.body.user_recruiter === ""
      ) {
        return helper.response(response, 404, "user recruiter must be filled");
      } else if (
        request.body.msg === undefined ||
        request.body.msg === null ||
        request.body.msg === ""
      ) {
        return helper.response(response, 404, "message must be filled");
      } else {
        const roomChatId = Math.round(Math.random() * 100000)
        const setData = {
        roomchat_id: roomChatId,
        user_id: user_worker,
        created_at: new Date()
        }
        const setData2 = {
        roomchat_id: roomChatId,
        user_id: user_recruiter,
        created_at: new Date(),
        }
        const postWorker = await postRoomChat(setData);
        const postRecruiter = await postRoomChat(setData2);
        const setData3 = {
        roomchat_id: roomChatId,
        user_id: user_recruiter,
        msg,
        msg_created_at: new Date()
        }
        const postFirstMessage = await postMessage(setData3)
        const setData4 = {
          roomchat_id: roomChatId,
          user_id: user_worker,
          notif: "You've got a New Message",
          notif_created_at: new Date()
        }
        const notification = await postNotification(setData4)
        const getMessageByChatRoom = await getMessageChatByRoom(roomChatId)
        return helper.response(response, 200, "Roomchat Created", getMessageByChatRoom)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postMessage: async (request, response) => {
    try {
      const { roomchat_id, user_id, receiver_id, msg } = request.body
      const setData = {
        roomchat_id,
        user_id,
        msg,
        msg_created_at: new Date(),
      }
      const setData2 = {
        roomchat_id,
        user_id: receiver_id,
        notif: "You've got a New Message",
        notif_created_at: new Date()
      }
      if (setData.roomchat_id === "") {
        return helper.response(response, 404, ` Input roomchat id`)
      } else if (setData.user_id === "") {
        return helper.response(response, 404, ` Input user id`)
      } else if (setData.msg === "") {
        return helper.response(response, 404, ` Input message`)
      } else {
        const result = await postMessage(setData);
        const notification = await postNotification(setData2)
        return helper.response(response, 201, "Message Created", result);
      }
    } catch (error) {
        return helper.response(response, 400, "Bad Request", error);
    }
  },
}