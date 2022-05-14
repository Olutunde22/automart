import Axios from 'axios';

const axiosInstance = Axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: {
		'Content-Type': 'application/json',
	},
});

//AUTH
export const login = (body) => {
	return axiosInstance.post('/user/login', body);
};
export const signup = (body) => {
	return axiosInstance.post('/user/signup', body);
};

export const resetPassword = (resetId, body) => {
	return axiosInstance.post(`/reset/${resetId}`, body);
};

export const forgotPassword = (body) => {
	return axiosInstance.post('/forgot', body);
};

export const refresh = (body) => {
	return axiosInstance.post('/refresh', body);
};

//CRUD FOR CAR
export const createCar = (body, token) => {
	return axiosInstance.post('/car', body, {
		headers: {
			Authorization: `Bearer ${token} `,
		},
	});
};
export const editCar = (carId, body, token) => {
	return axiosInstance.patch(`/car/${carId}`, body, {
		headers: {
			Authorization: `Bearer ${token} `,
		},
	});
};
export const getCar = (carId) => {
	return axiosInstance.get(`/car/${carId}`);
};
export const getCars = (limit) => {
	return axiosInstance.get(`/car?limit=${limit}`);
};
export const deleteCar = (carId, userId) => {
	return axiosInstance.delete(`/car/${carId}/${userId}`);
};
