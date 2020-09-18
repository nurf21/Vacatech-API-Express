const router = require('express').Router()
const { getAllWorker, loginUser, regWorker, regRecruiter, forgotPassword, changePassword, activationEmail, activationUser } = require('../controller/users')

router.get('/worker', getAllWorker)

router.post('/login', loginUser)
router.post('/register/worker', regWorker)
router.post('/register/recruiter', regRecruiter)
router.post('/register/email', activationEmail)
router.post('/forgot', forgotPassword)
router.patch('/change', changePassword)
router.patch('/activate', activationUser)

router.post("/login", loginUser)
router.post("/register/worker", regWorker)
router.post("/register/recruiter", regRecruiter)
router.post("/forgot", forgotPassword)
router.patch("/change", changePassword)

module.exports = router
