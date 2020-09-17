const router = require('express').Router()
const { getAllUser, getUserById, loginUser, regWorker, regRecruiter, forgotPassword, changePassword } = require('../controller/users')

router.get("/user/", getAllUser);
router.get("/user/:id", getUserById);
router.post('/login', loginUser)
router.post('/register/worker', regWorker)
router.post('/register/recruiter', regRecruiter)
router.post('/forgot', forgotPassword)
router.patch('/change', changePassword)

module.exports = router;
