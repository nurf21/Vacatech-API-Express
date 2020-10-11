const { 
  getMessageChatByRoom, 
  getMessageByUserId, 
  getNotificationById,
  getRoomChatById,
  getIdFromRoomchat, 
  getLatestMessageByRoom,
  postRoomChat, 
  postMessage,
  postNotification
} = require("../model/roomchat")
const { getUserById } = require("../model/users")
const { getProfileById } = require("../model/profile")
const { getCompanyProfileById } = require("../model/companyProfile")

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
  getRoomChatById: async (request, response) => {
    try {
      const { user_id } = request.params
      const result = await getRoomChatById(user_id)
      const otherId = await Promise.all(result.map( async (value)=>{
        const ids = value.roomchat_id
        const roomchatId = await getIdFromRoomchat(ids)
        const filtered = roomchatId.filter(value=>{
          return value.user_id != user_id
        })
        const getInfo = await getUserById(filtered[0].user_id)
        const latestMessage = await getLatestMessageByRoom(ids)
        const newest = latestMessage.map(value=>{
          return value.msg
        })
        if(newest.length <=0){
          newest[0] = ''
        }
        let getProfile = await getProfileById(filtered[0].user_id)
        if(getProfile.length <= 0){
          getProfile = await getCompanyProfileById(filtered[0].user_id)
        }
        const profileImg = getProfile.map(value=>{
          return value.profile_img
        })
        const setData = {
          roomchat_id: ids,
          user_id: getInfo[0].user_id,
          user_email: getInfo[0].user_email,
          user_name: getInfo[0].user_name,
          user_img: getInfo[0].user_img,
          user_phone: getInfo[0].user_phone,
          profile_img: profileImg[0],
          msg: newest[0]
        }
        return setData
      }))
      if (result.length > 0) {
        return helper.response(response, 200, "Succes get Roomchat By User Id", otherId)
      } else {
        return helper.response(response, 404, `Roomchat With Id : ${user_id} Not Found`)
      }
    } catch (error) {
      console.log(error)
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
        return helper.response(response, 400, "user worker must be filled");
      } else if (
        request.body.user_recruiter === undefined ||
        request.body.user_recruiter === null ||
        request.body.user_recruiter === ""
      ) {
        return helper.response(response, 400, "user recruiter must be filled");
      } else if (
        request.body.msg === undefined ||
        request.body.msg === null ||
        request.body.msg === ""
      ) {
        return helper.response(response, 400, "message must be filled");
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
        const recruiter = await getUserById(user_recruiter)
        const setData4 = {
          user_id: user_worker,
          message: `${recruiter[0].user_name} sent you a new message.`,
          status: 0,
          created_at: new Date()
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