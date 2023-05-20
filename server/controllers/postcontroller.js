const post = require('../models/postsModel')
const SubG = require('../models/subGmodel')
const postReports = require('../models/postReportModel')

const createPost = async (req, res) => {
    const { uname, name, description, subG } = req.body
    try {
        const myPost = await post.createPost(uname, name, description, subG)
        await SubG.addPost(name, subG)
        res.status(200).json({ myPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getPosts = async (req, res) => {
    const { subG } = req.body
    try {
        const myPosts = await post.getPosts(subG)
        const mySubG = await SubG.getSubGDetails(subG)
        await SubG.addVisit(subG)
        bannedWords = mySubG[0]['bannedKeywords']
        for (let i = 0; i < myPosts.length; i++) {
            for (let j = 0; j < bannedWords.length; j++) {
                if (myPosts[i]['postText'].includes(bannedWords[j])) {
                    myPosts[i]['postText'] = myPosts[i]['postText'].replace(bannedWords[j], '****')
                }
            }
        }
        res.status(200).json({ myPosts })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const createComment = async (req, res) => {
    const { uname, postName, commentText } = req.body
    try {
        const myComment = await post.createComment(uname, postName, commentText)
        res.status(200).json({ myComment })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getComments = async (req, res) => {
    const { post } = req.body
    try {
        const myComments = await post.getComments(post)
        res.status(200).json({ myComments })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const reportPost = async (req, res) => {
    const { uname, who, postName, subG, reportText, postText } = req.body
    try {
        await SubG.addReport(postName, subG)
        const myReport = await postReports.createAReport(uname, who, postName, subG, reportText, postText)
        await post.reportPost(postName)
        res.status(200).json({ myReport })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getReports = async (req, res) => {
    const { subG, uname } = req.body
    try {
        const mySubG = await SubG.getSubGDetails(subG)
        if (mySubG[0]['uname'] === uname) {
            const myReports = await postReports.getReports(subG)
            res.status(200).json({ myReports })
        } else {
            console.log('You are not the admin of this Sub Greddiit')
            res.status(400).json({ err: 'You are not the admin of this Sub Greddiit' })
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const deleteReportedPost = async (req, res) => {
    const { postName, subG, _id } = req.body
    try {
        await SubG.removeReport(postName, subG)
        await post.deletePost(postName)
        await postReports.deleteReport(_id)
        res.status(200).json({ message: 'Post deleted' })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const ignoreTheReport = async (req, res) => {
    const { postName, subG, _id } = req.body
    try {
        await postReports.handledReport(_id)
        await post.ignoreReport(postName, _id)
        res.status(200).json({ message: 'Report ignored' })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getSavedPosts = async (req, res) => {
    const { uname } = req.body
    try {
        const mySavedPosts = await post.getSavedPosts(uname)
        if (mySavedPosts.length == 0) {
            res.status(200).json({ mySavedPosts })
        }
        else {
            const mySubG = await SubG.getSubGDetails(mySavedPosts[0]['subG'])
            const bannedWords = mySubG[0]['bannedKeywords']
            for (let i = 0; i < mySavedPosts.length; i++) {
                for (let j = 0; j < bannedWords.length; j++) {
                    if (mySavedPosts[i]['postText'].includes(bannedWords[j])) {
                        mySavedPosts[i]['postText'] = mySavedPosts[i]['postText'].replace(bannedWords[j], '****')
                    }
                }
            }
            res.status(200).json({ mySavedPosts })
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const savePost = async (req, res) => {
    const { uname, postName } = req.body
    try {
        const mySavedPost = await post.savePost(uname, postName)
        res.status(200).json({ mySavedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const unSavePost = async (req, res) => {
    const { uname, postName } = req.body
    try {
        const myUnSavedPost = await post.unSavePost(uname, postName)
        res.status(200).json({ myUnSavedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const upvotePost = async (req, res) => {
    const { uname, postName } = req.body
    try {
        const myUpvotedPost = await post.upvotePost(uname, postName)
        res.status(200).json({ myUpvotedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const downvotePost = async (req, res) => {
    const { uname, postName } = req.body
    try {
        const myDownvotedPost = await post.downvotePost(uname, postName)
        res.status(200).json({ myDownvotedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const unUpvotePost = async (req, res) => {
    const { uname, postName } = req.body
    try {
        const myUnUpvotedPost = await post.unUpvotePost(uname, postName)
        res.status(200).json({ myUnUpvotedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const unDownvotePost = async (req, res) => {
    const { uname, postName } = req.body
    try {
        const myUnDownvotedPost = await post.unDownvotePost(uname, postName)
        res.status(200).json({ myUnDownvotedPost })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

module.exports = { createPost, getPosts, createComment, getComments, reportPost, getReports, deleteReportedPost, ignoreTheReport, getSavedPosts, savePost, unSavePost, upvotePost, downvotePost, unUpvotePost, unDownvotePost }

