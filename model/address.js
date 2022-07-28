const mongoose = require("mongoose");

const schema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },

    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },

    street: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Street',
        required: true
    },

    longAddress: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        enum: [true, false],
        default: false,
        required: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
}, {
    timestamp: true,
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Address", schema);