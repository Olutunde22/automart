import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import { login, signup, reset, refresh } from '../Api'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => Cookies.get('am_at') ? jwt_decode(Cookies.get('am_at')) : null)
    const [accessToken, setAccessToken] = useState(() => Cookies.get('am_at') ? Cookies.get('am_at') : null)
    const [refreshToken, setRefreshToken] = useState(() => Cookies.get('am_rt') ? Cookies.get('am_rt') : null)
    const [loading, setLoading] = useState(true)
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

    const updateToken = async () => {
        try {
            const response = await refresh({ email: user.email, token: refreshToken })
            if (response.status === 200) {
                setUser(jwt_decode(response.data.accessToken))
                setAccessToken(response.data.accessToken)
                Cookies.set('am_at', response.data.accessToken)
            } else {
                logout()
            }
        } catch (err) {

        }
    }



    let contextData = {
        user,
        loginUser,
        signUpUser,
        logout,
        accessToken
    }

    useEffect(() => {
        if (loading) {
            updateToken()
            setLoading(false)
        }
        let intervalId = setInterval(() => {
            if (accessToken) {
                updateToken()
            }
        }, 1000 *60 * 3)// every three minutes
        return () => clearInterval(intervalId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}