import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email is required'],
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Email is invalid']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            min: [6, 'Password is too short']
        },
        refreshTokens: {
            type: [String],
        },
        resetId: String,
        disabled: {
            type: Boolean,
            enum: [true, false],
            default: false
        },
        salt: String,
    },
    { timestamps: true } //This stores the createdAt and updatedAt time of the model
)

const User = new mongoose.model('User', userSchema)

export default User