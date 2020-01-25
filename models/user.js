const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            index: {
                unique: true
            },
            minlength: [6, "Email can't be shorter than 6 characters"],
            maxlength: [64, "Email can't be longer than 64 characters"]
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    }, {
        timestamps: true
    }
)

UserSchema.path('email').validate(async email => {
    const emailCount = await mongoose.models.User.countDocuments({
        email
    })
    return !emailCount
}, 'Email already exists')


UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()

    bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel