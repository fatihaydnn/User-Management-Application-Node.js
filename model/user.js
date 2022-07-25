const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    surname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
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

    updatedAt: {
        type: Date,
        required: false,
    },

    deletedAt: {
        type: Date,
        required: false,
    }
}, {
    timestamp: true,
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("User", schema);
