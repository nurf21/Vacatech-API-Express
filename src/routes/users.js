const router = require('express').Router()
const { loginUser, regWorker, regRecruiter } = require('../controller/users')

// router.get('/', getAllUser)
router.post('/login', loginUser)
router.post('/register/worker', regWorker)
router.post('/register/recruiter', regRecruiter)

module.exports = router
