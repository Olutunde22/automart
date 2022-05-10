import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
const saltRounds = 10

const signUp = async ({ firstName, lastName, email, password }) => {
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            password
        })
        const hashed = await hashPassword(password)
        user.salt = hashed.salt
        user.password = hashed.password
        user.resetId = uuidv4()
        await user.save()
        return user
    } catch (error) {
        return false
    }
}

const login = async ({ email, password }) => {
    try {
        const foundUser = await User.findOne({ email: email })

        const result = await verifyPassword(password, foundUser.password)
        if (result) {
            return foundUser
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const logout = async ({ email, token }) => {
    try {
        const foundUser = await User.findOne({ email: email })
        foundUser.refreshTokens = foundUser.refreshTokens.filter(reftoken => reftoken !== token)
        await foundUser.save()
        return true
    } catch (error) {
        return false
    }
}

const addRefreshToken = async ({ email, refreshToken }) => {
    try {
        const foundUser = await User.findOne({ email: email })
        foundUser.refreshTokens.push(refreshToken)
        foundUser.save()
        return true
    } catch (error) {
        return false
    }

}

const checkRefreshToken = async ({ email, refreshToken }) => {
    try {
        const foundUser = await User.findOne({ email: email })
        if (!foundUser.refreshTokens.includes(refreshToken)) return false
        return true
    } catch (error) {
        return false
    }

}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    password = await bcrypt.hash(password, salt)
    return { salt, password }
}

const verifyPassword = async (userPassword, hashedPassword) => {
    return await bcrypt.compare(userPassword, hashedPassword)
}

export default {
    signUp,
    login,
    addRefreshToken,
    checkRefreshToken,
    logout,
}