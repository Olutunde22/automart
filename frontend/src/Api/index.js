import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

//AUTH
export const login = (body) => {
    return axiosInstance.post('/login', body)
}
export const signup = (body) => {
    return axiosInstance.post('/signup', body)
}

export const reset = (resetId, body) => {
    return axiosInstance.post(`/reset/${resetId}`, body)
}

//CRUD FOR CAR
export const createCar = (body) => {
    return axiosInstance.post('/car', body)
}
export const editCar = (carId, body) => {
    return axiosInstance.patch(`/car/${carId}`, body)
}
export const getCar = (carId) => {
    return axiosInstance.get(`/car/${carId}`)
}
export const getCars = () => {
    return axiosInstance.get('/car')
}
export const deleteCar = (carId) => {
    return axiosInstance.delete(`/car/${carId}`)
}

//User
export const getUser = (userId) => {
    return axiosInstance.get(`/user/${userId}`)
}
export const getUserCars = (userId, carId) => {
    return axiosInstance.get(`/user/${userId}/car/${carId}`)
}
