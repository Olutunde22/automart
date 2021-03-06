import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'))

export const Login = lazy(() => import('./pages/Login'))

export const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

export const ResetPassword = lazy(() => import('./pages/ResetPassword'))

export const Signup = lazy(() => import('./pages/Signup'))

export const Cars = lazy(() => import('./pages/Cars'))

export const Car = lazy(() => import('./pages/Car'))

export const CreateCar = lazy(() => import('./pages/CreateCar'))