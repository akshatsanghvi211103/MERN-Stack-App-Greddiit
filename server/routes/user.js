const express = require('express')
const { loginFunc, registerFunc, setDetails, deleteFollower, deleteFollowing, getFollowers, getFollowing, followUser, getDetails } = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')
const router = express.Router()

router.post('/login', loginFunc)
router.post('/register', registerFunc)

router.use(checkAuth)

router.post('/getFollowers', getFollowers) // something is wrong, these shud be authorized and shud be below using checkAuth
router.post('/getFollowing', getFollowing) // something is wrong, these shud be authorized and shud be below using checkAuth
router.post('/followUser', followUser) // something is wrong, these shud be authorized and shud be below using checkAuth
router.post('/deleteFollower', deleteFollower) // something is wrong, these shud be authorized and shud be below using checkAuth
router.post('/deleteFollowing', deleteFollowing) // something is wrong, these shud be authorized and shud be below using checkAuth
router.post('/details', setDetails)
router.post('/getDetails', getDetails)

// this cud be happening becuz maybe I tokenized the uname and not the id: yes, that was the problem also, the token was not being sent in the header properly

module.exports = router