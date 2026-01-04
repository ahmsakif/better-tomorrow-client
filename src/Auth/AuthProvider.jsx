import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.config';
import Loader from '../Components/Loader/Loader';

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email')
const facebookProvider = new FacebookAuthProvider()
const appleProvider = new OAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    // Create User with Email and Password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in user with Email and Password 
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Sign In
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Google Sign In
    const signInWithFacebook = () => {
        setLoading(true)
        return signInWithPopup(auth, facebookProvider)
    }

    // Google Sign In
    const signInWithApple = () => {
        setLoading(true)
        return signInWithPopup(auth, appleProvider)
    }

    // Sign Out User
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Update Profile Name + Photo 
    const updateUserProfile = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        })
    }

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const authInfo = {
        user,
        createUser,
        signInUser,
        signInWithGoogle,
        signInWithFacebook,
        signInWithApple,
        signOutUser,
        updateUserProfile,
        forgetPassword,
        loading,
        setLoading,
    }

    return (
        <AuthContext value={authInfo}>
            {
                !loading
                    ? children
                    : <Loader />
            }
        </AuthContext>
    )
};

export default AuthProvider;