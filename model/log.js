const mongoose = require("mongoose");

const schema = mongoose.Schema({
    type: {
        type: String,
        enum: ['POST', 'DELETE', 'UPDATE', 'GET'],
        default: 'GET',
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = mongoose.model("Log", schema);

// user.js modeli içinde ki 
// address: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Address",
// }],


// address.js modeli 
// user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// },
