const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema


const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    uname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    subGsPartButNotOwn: {
        type: Array,
        default: [],
    },
    subGsReq: {
        type: Array,
        default: [],
    },
    subGsOwn: {
        type: Array,
        default: [],
    },
    leftSubGs: {
        type: Array,
        default: [],
    },
    blockedInSubGs: { // rqd?
        type: Array,
        default: [],
    },
}, { timestamps: true })

// creating a static method of log in and register for the userSchema
userSchema.statics.login = async function (uname, password) {
    const user = await this.findOne({ uname }) // "this" refers to the userSchema
    if (!uname || !password) // empty fields
    throw Error('Please fill all the fields')
    
    if (!user)
        throw Error('Incorrect username') // change it to invalid credentials
    else {
        const same = await bcrypt.compare(password, user.password)
        if (same)
            return user
        else
            throw Error('Incorrect password') // change it to invalid credentials
    }
}

userSchema.statics.register = async function (fname, lname, uname, email, age, contact, password) {
    if (!fname || !lname || !uname || !email || !age || !contact || !password) // empty fields
        throw Error('Please fill all the fields')
    if (!validator.isEmail(email))
        throw Error('Invalid email')
    
    const userExists = await this.findOne({ uname }) // not find, as it will find all the users with the same username, which will take more time
    if (userExists)
        throw Error('Username already exists')
    const emailExists = await this.findOne({ email })
    if (emailExists)
        throw Error('Email already exists')
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // adding the fields into the database
    const user = await this.create({ fname, lname, uname, email, age, contact, password: hashedPassword }) // "this" refers to the userSchema
    return user
}

userSchema.statics.setDetails = async function (fname, lname, age, contact, uname) {
    if (!fname || !lname || !age || !contact) // empty fields
        throw Error('Please fill all the fields')
    const user = await this.findOne({ uname }) // using destructuring
    await this.updateOne({ uname }, { fname, lname, age, contact })
    return user
}

// delete the follower on both the sides: the follower and the user
userSchema.statics.deleteFollower = async function (uname, follower) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $pull: { followers: follower } })
    await this.updateOne({ uname: follower }, { $pull: { following: uname } })
    return user
}

userSchema.statics.deleteFollowing = async function (uname, followingPerson) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $pull: { following: followingPerson } })
    await this.updateOne({ uname: followingPerson }, { $pull: { followers: uname } })
    return user
}

userSchema.statics.getFollowers = async function (uname) {
    const user = await this.findOne({ uname })
    return user.followers
}

userSchema.statics.getFollowing = async function (uname) {
    const user = await this.findOne({ uname })
    return user.following
}

userSchema.statics.followUser = async function (uname, followingPerson) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $push: { following: followingPerson } })
    await this.updateOne({ uname: followingPerson }, { $push: { followers: uname } })
    return user
}

userSchema.statics.addSubG = async function (uname, subGName) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $push: { subGsOwn: subGName } })
    return user
}

userSchema.statics.deleteSubG = async function (uname, subGName) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $pull: { subGsOwn: subGName } })
    await this.updateOne({ uname }, { $pull: { subGsPartButNotOwn: subGName } })
    await this.updateOne({ uname }, { $pull: { subGsReq: subGName } })
    await this.updateOne({ uname }, { $pull: { leftSubGs: subGName } })
    await this.updateOne({ uname }, { $pull: { blockedInSubGs: subGName } })
    return user
}

userSchema.statics.requestToJoinSubG = async function (uname, subGName) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $push: { subGsReq: subGName } })
    return user
}

userSchema.statics.acceptRequest = async function (uname, subGName) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $pull: { subGsReq: subGName } })
    await this.updateOne({ uname }, { $push: { subGsPartButNotOwn: subGName } })
    return user
}

userSchema.statics.rejectRequest = async function (uname, subGName) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $pull: { subGsReq: subGName } })
    return user
}

userSchema.statics.leaveSubG = async function (uname, subGName) {
    const user = await this.findOne({ uname })
    await this.updateOne({ uname }, { $pull: { subGsPartButNotOwn: subGName } })
    await this.updateOne({ uname }, { $push: { leftSubGs: subGName } })
    return user
}

userSchema.statics.blockUser = async function (blockedUser, subGName) {
    await this.updateOne({ uname: blockedUser }, { $push: { blockedInSubGs: subGName } })
}

userSchema.statics.getDetails = async function (uname) {
    const user = await this.findOne({ uname })
    return user
}

module.exports = mongoose.model('User', userSchema)