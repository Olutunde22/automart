import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errorHandler = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const successHandler = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const years = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
];
export const condition = ["Nigerian Used", "Brand New", "Foreign Used"];
export const make = ["Toyota", "Mercedes-Benz", "Lexus", "Honda", "Ford"];
export const body = ["Van", "Suv", "Sedan", "Pickup"];
