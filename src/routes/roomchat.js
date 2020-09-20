const router = require("express").Router()
const { getMessageChatByRoom, getMessageByUserId, getRecentMessage, postRoomChat, postMessage } = require("../controller/roomchat")


router.get("/chat", getMessageChatByRoom)
router.get("/chat/recent", getRecentMessage)
router.get("/chat/user", getMessageByUserId)

router.post("/", postRoomChat)
router.post("/message", postMessage)


module.exports = router

