const mongoose = require("mongoose")

const schema = mongoose.Schema({
    key: {
        type: String
    },

    city_key: {
        type: String
    },

    districtCode: {
        type: String,
        required: true,
    },

    districtName: {
        type: String,
        required: true,
    },

    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
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

module.exports = mongoose.model("District", schema)