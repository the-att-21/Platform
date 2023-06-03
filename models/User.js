const { timeStamp } = require('console');
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ['user', 'admin', 'organizer'],
            default: 'user'
        }
    }, { timestamps: true }
);

const user = mongoose.model('User', userSchema)
module.exports = user