const mongoose = require("mongoose")

const schema = mongoose.Schema({
    key: {
        type: String
    },
    district_key: {
        type: String
    },

    streetCode: {
        type: String
    },

    streetName: {
        type: String
    },

    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    },

    isDeleted: {
        type: Boolean,
        enum: [true, false],
        default: false
    },

    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Street", schema)