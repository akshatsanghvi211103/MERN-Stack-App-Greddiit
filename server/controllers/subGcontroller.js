const subG = require('../models/subGmodel')
const User = require('../models/userModel')
const Post = require('../models/postsModel')
const PostReport = require('../models/postReportModel')

const createSubG = async (req, res) => {
    const { uname, name, description, tags, bannedKeywords } = req.body
    try {
        const mySubG = await subG.createSubG(uname, name, description, tags, bannedKeywords)
        const user = await User.addSubG(uname, name)
        res.status(200).json({ mySubG })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getMySubGs = async (req, res) => {
    const { uname } = req.body
    try {
        const mySubGs = await subG.getMySubGs(uname)
        res.status(200).json({ mySubGs })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getGenSubGs = async (req, res) => {
    try {
        const mySubGs = await subG.getGenSubGs()
        res.status(200).json({ mySubGs })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const deleteSubG = async (req, res) => {
    const { uname, name } = req.body
    try {
        const deletedSubG = await subG.deleteSubG(name)
        const user = await User.deleteSubG(uname, name)
        // delete all posts in the subG
        const posts = await Post.deleteAllPosts(name)
        const postReports = await PostReport.deleteAllReports(name)
        res.status(200).json({ deletedSubG })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getSubGDetails = async (req, res) => {
    const { subGNameRef } = req.body
    try {
        const subGDetails = await subG.getSubGDetails(subGNameRef)
        res.status(200).json({ subGDetails })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const requestJoinSubG = async (req, res) => {
    const { subGName, uname } = req.body
    try {
        const requestedSubG = await subG.requestToJoinSubG(subGName, uname)
        const user = await User.requestToJoinSubG(uname, subGName)
        res.status(200).json({ requestedSubG })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getRequestingUsers = async (req, res) => {
    const { subGName } = req.body
    try {
        const requestingUsers = await subG.getTheRequestingUsers(subGName)
        res.status(200).json({ requestingUsers })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const acceptRequest = async (req, res) => {
    const { subGName, uname } = req.body
    try {
        const acceptedRequest = await subG.acceptRequest(subGName, uname)
        const user = await User.acceptRequest(uname, subGName)
        res.status(200).json({ acceptedRequest })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const rejectRequest = async (req, res) => {
    const { subGName, uname } = req.body
    try {
        const rejectedRequest = await subG.rejectRequest(subGName, uname)
        const user = await User.rejectRequest(uname, subGName)
        res.status(200).json({ rejectedRequest })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const leaveSubG = async (req, res) => {
    const { uname, subGName } = req.body
    try {
        const leftSubG = await subG.leaveSubG(uname, subGName)
        const user = await User.leaveSubG(uname, subGName)
        res.status(200).json({ leftSubG })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const blockUser = async (req, res) => {
    const { blockedUser, subGName, postName, _id } = req.body
    try {
        const blocked = await subG.blockUser(blockedUser, subGName)
        await User.blockUser(blockedUser, subGName)
        await PostReport.handledReport(_id)
        res.status(200).json({ blocked })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

module.exports = { createSubG, deleteSubG, getMySubGs, getGenSubGs, getSubGDetails, requestJoinSubG, getRequestingUsers, acceptRequest, rejectRequest, leaveSubG, blockUser }