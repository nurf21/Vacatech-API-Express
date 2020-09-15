const router = require('express').Router()
const { regWorker, regRecruiter } = require('../controller/users')

// router.get('/', getAllUser)
// router.post('/login', loginUser)
router.post('/register/worker', regWorker)
router.post('/register/recruiter', regRecruiter)
// router.post('/register', registerUser)

module.exports = router
