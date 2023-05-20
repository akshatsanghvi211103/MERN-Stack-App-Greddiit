const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postReportSchema = new Schema({
    uname: { // the reporter
        type: String,
        required: true,
    },
    who: { // the reported
        type: String,
        required: true,
    },
    postName: { // the post
        type: String,
        required: true,
    },
    subG: { // the subG
        type: String,
        required: true,
    },
    reportText: { // the report
        type: String,
        required: true,
    },
    postText: { // the post
        type: String,
        required: true,
    },
    handledOrNot: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

postReportSchema.statics.createAReport = async function (uname, who, postName, subG, reportText, postText) {
    const myReport = await this.create({ uname, who, postName, subG, reportText, postText })
    return myReport
}

postReportSchema.statics.getReports = async function (subG) {
    const myReports = await this.find({ subG })
    return myReports
}

postReportSchema.statics.deleteReport = async function (_id) {
    const myReport = await this.deleteOne({ _id })
    return myReport
}

postReportSchema.statics.handledReport = async function (_id) {
    // const myReport = await this.deleteOne({ postName })
    return myReports = await this.updateOne({ _id }, { $set: { handledOrNot: true } })
}

postReportSchema.statics.deleteAllReports = async function (subG) {
    const myReports = await this.deleteMany({ subG })
}

module.exports = mongoose.model('postReport', postReportSchema);