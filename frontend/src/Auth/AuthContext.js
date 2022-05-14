import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import { login, signup, reset } from '../Api'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => Cookies.get('am_at') ? jwt_decode(Cookies.get('am_at')) : null)
    const [accessToken, setAccessToken] = useState(() => Cookies.get('am_at') ? Cookies.get('am_at') : null)
    const [refreshToken, setRefreshToken] = useState(() => Cookies.get('am_rt') ? Cookies.get('am_rt') : null)

    const signUpUser = async ({ firstName, lastName, email, password }) => {
        try {
            const { data, status } = await signup({ firstName, lastName, email, password })
            if (status === 200) {
                setUser(jwt_decode(data.accessToken))
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                Cookies.set('am_at', data.accessToken)
                Cookies.set('am_rt', data.refreshToken)
                return { data, status }
            }
        }
        catch (error) {
            return error.response
        }
    }

    const loginUser = async ({ email, password }) => {
        try {
            const { data, status } = await login({ email, password })
            if (status === 200) {
                setUser(jwt_decode(data.accessToken))
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                Cookies.set('am_at', data.accessToken)
                Cookies.set('am_rt', data.refreshToken)
                return { data, status }
            } else {
                return { data, status }
            }
        }
        catch (error) {
            return error.response
        }
    }


    const logout = () => {
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        Cookies.remove('am_at')
        Cookies.remove('am_rt')
    }

    const resetPassword = async ({ resetId, password }) => {
        const { data, status } = await reset({ resetId, password })
        return { data, status }
    }

    let contextData = {
        user,
        loginUser,
        signUpUser,
        logout,
        resetPassword,
        accessToken
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}