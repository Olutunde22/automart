import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'https://4000-olutunde22-automart-3fifz825goz.ws-eu45.gitpod.io/api/',
    headers: {
        'Content-Type': 'application/json',

    },
});

//AUTH
export const login = (body) => {
    return axiosInstance.post('/user/login', body)
}
export const signup = (body) => {
    return axiosInstance.post('/user/signup', body)
}

export const reset = (resetId, body) => {
    return axiosInstance.post(`/reset/${resetId}`, body)
}

export const refresh = (body) => {
    return axiosInstance.post('/refresh', body)
}

//CRUD FOR CAR
export const createCar = (body, token) => {
    return axiosInstance.post('/car', body, {
        headers: {
            'Authorization': `Bearer ${token} `
        }
    })
}
export const editCar = (carId, body, token) => {
    return axiosInstance.patch(`/car/${carId}`, body, {
        headers: {
            'Authorization': `Bearer ${token} `
        }
    })
}
export const getCar = (carId) => {
    return axiosInstance.get(`/car/${carId}`)
}
export const getCars = (limit) => {
    return axiosInstance.get(`/car?limit=${limit}`)
}
export const deleteCar = (carId) => {
    return axiosInstance.delete(`/car/${carId}`)
}

//User
export const getUserCars = (userId, carId) => {
    return axiosInstance.get(`/user/${userId}/car`)
}
