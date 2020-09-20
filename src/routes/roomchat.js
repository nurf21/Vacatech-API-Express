const router = require("express").Router()
const { 
    getMessageChatByRoom, 
    getMessageByUserId, 
    // getRecentMessage, 
    getRoomChatById, 
    getNotificationById,
    postRoomChat, 
    postMessage 
} = require("../controller/roomchat")


router.get("/chat/message", getMessageChatByRoom)
router.get("/chat/room", getRoomChatById)
router.get("/chat/user", getMessageByUserId)
router.get("/chat/notif", getNotificationById)
// router.get("/chat/recent", getRecentMessage)

router.post("/", postRoomChat)
router.post("/message", postMessage)


module.exports = router

