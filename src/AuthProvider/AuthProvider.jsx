import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../FirebaseConfig/FireBaseConfig';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loding, setLoding] = useState(true)
    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()
    const registerUser = (email, password) => {
        console.log(email, password);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (upname, upphoto) => {
        return updateProfile(auth.currentUser, {
            displayName: upname, photoURL: upphoto
        })
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            setLoding(false)
            if (currentUser) {
                const userInfo = { email: currentUser?.email }
                const res = await axiosPublic.post('/jwt', userInfo)
                console.log(res.data);
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token)
                    setUser(currentUser)
                    setLoding(false)
                }


            }
            else {
                localStorage.removeItem('access-token')
                setUser(currentUser)
            }
            return () => {
                unSubscribe
            }
        })
    }, [])
    const userInfo = {
        user,
        registerUser,
        googleLogin,
        loginUser,
        logOut,
        updateUserProfile,
        loding
    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {
                    children
                }
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;