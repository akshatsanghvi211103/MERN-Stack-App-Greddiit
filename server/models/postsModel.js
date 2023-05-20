const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    uname: { // the creator
        type: String,
        required: true,
    },
    name: { // of the post
        type: String,
        required: true,
    },
    postText: { // content
        type: String,
        required: true,
    },
    subG: { // belongs to which subG
        type: String,
        required: true,
    },
    upvotedby: {
        type: Array,
        default: [],
    },
    downvotedby: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
    reports: {
        type: Array,
        default: [],
    },
    savedBy: {
        type: Array,
        default: [],
    },
}, { timestamps: true })

postSchema.statics.createPost = async function (uname, name, postText, subG) {
    const postExists = await this.findOne({ name })
    if (postExists)
        throw Error('Post already exists')
    const myPost = await this.create({ uname, name, postText, subG })
    // add the post to the subG collection also
    return myPost
}

postSchema.statics.getPosts = async function (subG) {
    const myPosts = await this.find({ subG })
    return myPosts
}

postSchema.statics.createComment = async function (uname, postName, commentText) {
    const myPost = await this.findOne({ name: postName })
    const myComment = {
        uname,
        commentText,
    }
    await myPost.comments.push(myComment) // ?? is this the right way to do it?
    await myPost.save() // saving the post
}

postSchema.statics.getComments = async function (post) {
    const myPost = await this.findOne({ name: post })
    return myPost.comments
}

postSchema.statics.reportPost = async function (postName, _id) { // the report id
    await this.updateOne({ name: postName }, { $push: { reports: _id } })
    return myPost
}

postSchema.statics.deletePost = async function (postName) {
    const myPost = await this.deleteOne({ name: postName })
    return myPost
}

postSchema.statics.ignoreReport = async function (postName, _id) {
    const myPost = await this.updateOne({ name: postName }, { $pull: { reports: _id } })
    return myPost
}

postSchema.statics.deleteAllPosts = async function (name) {
    const myPosts = await this.deleteMany({ subg: name })
    return myPosts
}

postSchema.statics.getSavedPosts = async function (uname) {
    const myPosts = await this.find({ savedBy: uname })
    return myPosts
}

postSchema.statics.savePost = async function (uname, postName) {
    const myPosts = await this.updateOne({ name: postName }, { $push: { savedBy: uname } })
    return myPosts
}

postSchema.statics.unSavePost = async function (uname, postName) {
    const myPosts = await this.updateOne({ name: postName }, { $pull: { savedBy: uname } })
    return myPosts
}

postSchema.statics.upvotePost = async function (uname, postName) {
    const myPosts = await this.updateOne({ name: postName }, { $push: { upvotedby: uname } })
    return myPosts
}

postSchema.statics.unUpvotePost = async function (uname, postName) {
    const myPosts = await this.updateOne({ name: postName }, { $pull: { upvotedby: uname } })
    return myPosts
}

postSchema.statics.downvotePost = async function (uname, postName) {
    const myPosts = await this.updateOne({ name: postName }, { $push: { downvotedby: uname } })
    return myPosts
}

postSchema.statics.unDownvotePost = async function (uname, postName) {
    const myPosts = await this.updateOne({ name: postName }, { $pull: { downvotedby: uname } })
    return myPosts
}

module.exports = mongoose.model('posts', postSchema)