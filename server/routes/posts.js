const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/checkAuth')
const { createPost, getPosts, createComment, getComments, reportPost, getReports, deleteReportedPost, ignoreTheReport, getSavedPosts, savePost, unSavePost, upvotePost, downvotePost, unUpvotePost, unDownvotePost } = require('../controllers/postcontroller')

router.use(checkAuth)

router.post('/createPost', createPost)
router.post('/getPosts', getPosts)
router.post('/createComment', createComment)
router.post('/getComments', getComments)
router.post('/reportPost', reportPost)
router.post('/getReports', getReports)
router.post('/deleteReportedPost', deleteReportedPost)
router.post('/ignoreTheReport', ignoreTheReport)
router.post('/getSavedPosts', getSavedPosts)
router.post('/savePost', savePost)
router.post('/unSavePost', unSavePost)
router.post('/upvotePost', upvotePost)
router.post('/downvotePost', downvotePost)
router.post('/unUpvotePost', unUpvotePost)
router.post('/unDownvotePost', unDownvotePost)


module.exports = router
