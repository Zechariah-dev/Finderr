const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);

    next();
})

module.exports = model('user', UserSchema)
