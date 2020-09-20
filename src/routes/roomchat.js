const router = require("express").Router()
const { 
    getMessageChatByRoom, 
    getMessageByUserId, 
    getRoomChatById, 
    getNotificationById,
    postRoomChat, 
    postMessage 
} = require("../controller/roomchat")


router.get("/chat/message/:roomchat_id", getMessageChatByRoom)
router.get("/chat/room/:user_id", getRoomChatById)
router.get("/chat/user", getMessageByUserId)
router.get("/chat/notif/:id", getNotificationById)

router.post("/", postRoomChat)
router.post("/message", postMessage)


module.exports = router

