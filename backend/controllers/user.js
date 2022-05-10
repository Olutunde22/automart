import User from '../services/user.js';
import { generateAccessToken, generateRefreshToken } from '../auth/authenticate.js';

const signup = async (req, res) => {
	const user = await User.signUp(req.body);

	if (user === false)
		return res.status(400).json({ message: 'Error while signing up, please try again' });

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
	await User.addRefreshToken({ email: user.email, refreshToken: refreshToken });
	res.status(200).json({ accessToken, refreshToken });
};

const login = async (req, res) => {
	const user = await User.login(req.body);

	if (user === false) return res.status(400).json({ message: 'Invalid username or password' });

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
	await User.addRefreshToken({ email: user.email, refreshToken: refreshToken });
	res.status(200).json({ accessToken, refreshToken });
};

const logout = async (req, res) => {
	const email = req.body.email;
	const token = req.body.token;
	const logoutUser = await User.logout({ email, token });
	if (logoutUser === false) return res.status(400).json({ message: 'Error while logging out' });
	return res.status(200);
};

export default { signup, login, logout };