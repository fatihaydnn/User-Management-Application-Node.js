const mongoose = require("mongoose")

const schema = mongoose.Schema({
  
    key: {
        type: String
    },
   
    cityCode: {
        type: String,
        required: true,
    },

    cityName: {
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

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("City", schema)
