import jwt from 'jsonwebtoken'
import User from '../services/user.js'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message: 'You must be logged in to create a post'})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'User not authenticated' })
        req.user = user
        next()
    })
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.body.token
    const email = req.body.email
    if (refreshToken === null) return res.status(401)
    if (!await User.checkRefreshToken({ email, refreshToken })) return res.status(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401)
        const accessToken = generateAccessToken({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        })
        res.json({ accessToken: accessToken })
    })

}