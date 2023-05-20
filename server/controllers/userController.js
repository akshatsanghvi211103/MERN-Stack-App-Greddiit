const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const createToken = (uname) => {
    return jwt.sign({uname}, process.env.JWT_SECRET) // making a token with the username
}
// login controller function
const loginFunc = async (req, res) => {
    const { fname, lname, uname, email, age, contact, password } = req.body
    try {
        const user = await User.login(uname, password) // static method of the user model
        const token = createToken(user.uname)
        console.log(user.uname) // why cant i send the user.fname or lname "only" seperately? it gives error for some reason
        res.status(200).json({ user, token })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}
// register controller function
const registerFunc = async (req, res) => {
    const { fname, lname, uname, email, age, contact, password } = req.body
    try {
        const user = await User.register(fname, lname, uname, email, age, contact, password) // static method of the user model
        const token = createToken(user.uname)
        res.status(200).json({ uname, token })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const setDetails = async (req, res) => {
    const { fname, lname, age, contact, uname } = req.body
    try {
        const user = await User.setDetails(fname, lname, age, contact, uname) // static method of the user model
        const token = createToken(user.uname)
        res.status(200).json({ uname, token })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const deleteFollower = async (req, res) => {
    const { uname, follower } = req.body
    try {
        const user = await User.deleteFollower(uname, follower) // static method of the user model
        const token = createToken(user.uname)
        res.status(200).json({ uname, token })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const deleteFollowing = async (req, res) => {
    const { uname, followingPerson } = req.body
    try {
        const user = await User.deleteFollowing(uname, followingPerson) // static method of the user model
        const token = createToken(user.uname)
        res.status(200).json({ uname, token })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getFollowers = async (req, res) => {
    const { uname } = req.body
    try {
        const followers = await User.getFollowers(uname) // static method of the user model
        res.status(200).json({ followers })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getFollowing = async (req, res) => {
    const { uname } = req.body
    try {
        const following = await User.getFollowing(uname) // static method of the user model
        res.status(200).json({ following })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const followUser = async (req, res) => {
    const { uname, follower } = req.body
    try {
        const user = await User.followUser(uname, follower) // static method of the user model
        const token = createToken(user.uname)
        res.status(200).json({ uname, token })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

const getDetails = async (req, res) => {
    const { uname } = req.body
    try {
        const user = await User.getDetails(uname) // static method of the user model
        res.status(200).json({ user })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err: err.message })
    }
}

module.exports = { loginFunc, registerFunc, setDetails, deleteFollower, deleteFollowing, getFollowers, getFollowing, followUser, getDetails }