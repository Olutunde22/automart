import User from '../models/user.js'
import { generateAccessToken, generateRefreshToken } from '../auth/authenticate.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
const saltRounds = 10

const signUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	try {
		const user = new User({
			firstName,
			lastName,
			email,
			password
		})

		if (!(firstName && lastName && email && password)) {
			return res.status(401).json({
				message: 'Please make sure [firstName, lastName, email and passowrd] are provided'
			})
		}

		const foundUser = await User.findOne({ email: email })
		if (foundUser) return res.status(401).json({
			message: 'Sorry, this email address is already in use'
		})

		const hashed = await hashPassword(password)
		user.salt = hashed.salt
		user.password = hashed.password
		user.resetId = uuidv4()
		const accessToken = generateAccessToken({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
		const refreshToken = generateRefreshToken({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
		await user.save()
		await addRefreshToken({ email: user.email, refreshToken: refreshToken });
		return res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		return res.status(400).json({ message: 'Error while trying to signup, please try again.' });
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const foundUser = await User.findOne({ email: email })
		if (!foundUser) {
			return res.status(401).json({
				message: 'Invalid email or password'
			})
		}

		if (foundUser.disabled) {
			return res.status(401).json({
				message: 'Account disabled, please reset passworrd or contact administrator'
			})
		}
		const result = await verifyPassword(password, foundUser.password)
		if (!result) {
			return res.status(401).json({
				message: 'Invalid email or password'
			})
		}
		const accessToken = generateAccessToken({
			firstName: foundUser.firstName,
			lastName: foundUser.lastName,
			email: foundUser.email,
		});
		const refreshToken = generateRefreshToken({
			firstName: foundUser.firstName,
			lastName: foundUser.lastName,
			email: foundUser.email,
		});
		await addRefreshToken({ email: foundUser.email, refreshToken: refreshToken });
		return res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		return res.status(400).json({
			message: 'Error while trying to login, please try again.'
		})
	}
}

const logout = async (req, res) => {
	const email = req.body.email;
	const token = req.body.token;
	try {
		const foundUser = await User.findOne({ email: email })
		foundUser.refreshTokens = foundUser.refreshTokens.filter(reftoken => reftoken !== token)
		await foundUser.save()
		return res.status(200);
	} catch (error) {
		return res.status(400).json({
			message: 'Error while trying to logout, please try again.'
		})
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
	logout,
	checkRefreshToken
}