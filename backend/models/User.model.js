import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    highScore: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)
export default User