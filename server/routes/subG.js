const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const { createSubG, deleteSubG, getMySubGs, getGenSubGs, getSubGDetails, requestJoinSubG, getRequestingUsers, acceptRequest, rejectRequest, leaveSubG, blockUser } = require('../controllers/subGcontroller')

const router = express.Router()

router.use(checkAuth)

router.post('/deleteSubG', deleteSubG)
router.post('/getMySubGs', getMySubGs)
router.post('/getGenSubGs', getGenSubGs)
router.post('/requestJoinSubG', requestJoinSubG)
router.post('/getRequestingUsers', getRequestingUsers)
router.post('/acceptRequest', acceptRequest)
router.post('/rejectRequest', rejectRequest)
router.post('/leaveSubG', leaveSubG)
router.post('/getSubGDetails', getSubGDetails)
router.post('/blockUser', blockUser)

router.post('/createSubG', createSubG)

module.exports = router
