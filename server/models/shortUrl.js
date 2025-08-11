const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                try {
                    new URL(v);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return Math.random().toString(36).substring(2, 8);
        }
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);