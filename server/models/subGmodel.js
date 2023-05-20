const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subGSchema = new Schema({
    uname: { // the creator
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
        required: true,
    },
    bannedKeywords: {
        type: Array,
        default: [],
        required: true,
    },
    posts: { // not sure if this is needed
        type: Array,
        default: [],
    },
    numPosts: {
        type: Number,
        default: 0,
    },
    members: { // followers
        type: Array,
        default: [],
    },
    numMembers: {
        type: Number,
        default: 1,
    },
    requestedMembers: {
        type: Array,
        default: [],
    },
    rejectedMembers: {
        type: Array,
        default: [],
    },
    blockedMembers: {
        type: Array,
        default: [],
    },
    membersTillNow: {
        type: Array,
        default: [],
    },
    dailyPosts: {
        type: Array,
        default: [],
    },
    dailyVisits: {
        type: Array,
        default: [],
    },
    totalReportsDeleted: {
        type: Number,
        default: 0,
    },
    totalReports: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

subGSchema.statics.createSubG = async function (uname, name, description, tags, bannedKeywords) {
    const subGexists = await this.findOne({ name })
    if (subGexists)
        throw Error('SubG already exists')
    const SubG = await this.create({ uname, name, description, tags, bannedKeywords, members: [uname], numMembers: 1, membersTillNow: [{ date: new Date().toLocaleDateString(), numMembers: 1 }], dailyPosts: [{ date: new Date().toLocaleDateString(), numPosts: 0 }], dailyVisits: [{ date: new Date().toLocaleDateString(), numVisits: 0 }], totalReportsDeleted: 0, totalReports: 0 })
    return SubG
}

subGSchema.statics.deleteSubG = async function (name) {
    const subG = await this.deleteOne({ name })
    return subG
}

subGSchema.statics.getMySubGs = async function (uname) {
    const mySubGs = await this.find({ uname })
    return mySubGs
}

subGSchema.statics.getGenSubGs = async function () {
    const mySubGs = await this.find()
    return mySubGs
}

subGSchema.statics.getSubGDetails = async function (subGNameRef) {
    const subG = await this.find({ name: subGNameRef })
    return subG
}

subGSchema.statics.requestToJoinSubG = async function (subGName, uname) {
    const subGexists = await this.findOne({ name: subGName })
    await this.updateOne({ name: subGName }, { $push: { requestedMembers: uname } })
    return subGexists
}

subGSchema.statics.getTheRequestingUsers = async function (subGName) {
    const subG = await this.findOne({ name: subGName })
    return subG.requestedMembers
}

subGSchema.statics.acceptRequest = async function (subGName, uname) {
    const subG = await this.findOne({ name: subGName })
    await this.updateOne({ name: subGName }, { $pull: { requestedMembers: uname } })
    await this.updateOne({ name: subGName }, { $push: { members: uname } })
    // increasing the count
    await this.updateOne({ name: subGName }, { $inc: { numMembers: 1 } })
    // add the date (not time) only if it is not already there
    const today = new Date()
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    const prevNumMembers = subG.membersTillNow[subG.membersTillNow.length - 1].numMembers
    if (subG.membersTillNow[subG.membersTillNow.length - 1].date === date) {
        // update the last element to +1
        const oldDate = subG.membersTillNow[subG.membersTillNow.length - 1].date
        await this.updateOne({ name: subGName }, { membersTillNow: { date: oldDate, numMembers: prevNumMembers + 1 } })
        console.log('increased')
    } else {
        // set it equal to the previous element
        await this.updateOne({ name: subGName }, { $push: { membersTillNow: { date, numMembers: prevNumMembers + 1 } } })
        console.log('added')
    }
    return subG
}

subGSchema.statics.rejectRequest = async function (subGName, uname) {
    const subG = await this.findOne({ name: subGName })
    await this.updateOne({ name: subGName }, { $pull: { requestedMembers: uname } })
    await this.updateOne({ name: subGName }, { $push: { rejectedMembers: uname } })
    return subG
}

subGSchema.statics.leaveSubG = async function (uname, subGName) {
    const subG = await this.findOne({ name: subGName })
    await this.updateOne({ name: subGName }, { $pull: { members: uname } })
    return subG
}

subGSchema.statics.addPost = async function (name, subG) {
    const mySubG = await this.findOne({ name: subG })
    await this.updateOne({ name: subG }, { $push: {posts: name}})
    const subs = await this.updateOne({ name: subG }, { $inc: {numPosts: 1} })
    const today = new Date()
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    if (mySubG.dailyPosts[mySubG.dailyPosts.length - 1].date === date) {
        const prevNumPosts = mySubG.dailyPosts[mySubG.dailyPosts.length - 1].numPosts
        const oldDate = mySubG.dailyPosts[mySubG.dailyPosts.length - 1].date
        await this.updateOne({ name: subG }, { dailyPosts: { date: oldDate, numPosts: prevNumPosts + 1 } })
        console.log('increased post')
    } else {
        await this.updateOne({ name: subG }, { $push: { dailyPosts: { date, numPosts: 1 } } })
        console.log('added post')
    }
}

subGSchema.statics.addReport = async function (postName, subGName) {
    const subG = await this.findOne({ name: subGName })
    await this.updateOne( { name: subGName }, { $inc: {totalReports: 1} })
    return subG
}

subGSchema.statics.removeReport = async function (postName, subG) {
    await this.updateOne( { name: subG }, { $pull: { posts: postName } })
    await this.updateOne( { name: subG }, { $inc: {numPosts: -1} })
    await this.updateOne( { name: subG }, { $inc: {totalReportsDeleted: 1} })
}

subGSchema.statics.blockUser = async function (blockedUser, subG) {
    await this.updateOne({ name: subG }, { $push: { blockedMembers: blockedUser } })
}

subGSchema.statics.addVisit = async function (subG) {
    const mySubG = await this.findOne({ name: subG })
    const today = new Date()
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    if (mySubG.dailyVisits[mySubG.dailyVisits.length - 1].date === date) {
        const prevNumVisits = mySubG.dailyVisits[mySubG.dailyVisits.length - 1].numVisits
        const oldDate = mySubG.dailyVisits[mySubG.dailyVisits.length - 1].date
        await this.updateOne({ name: subG }, { dailyVisits: { date: oldDate, numVisits: prevNumVisits + 1 } })
        console.log('increased visit')
    } else {
        await this.updateOne({ name: subG }, { $push: { dailyVisits: { date, numVisits: 1 } } })
        console.log('added visit')
    }
}

module.exports = mongoose.model('subG', subGSchema)