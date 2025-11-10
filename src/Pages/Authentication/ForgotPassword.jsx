import React, { useRef } from 'react';
import { Link } from 'react-router';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';
import useAuth from '../../Hooks/useAuth';

const ForgotPassword = () => {

    const { forgetPassword } = useAuth()
    const emailRef = useRef()

    const handleForgetPassword = (e) => {
        e.preventDefault()

        const email = emailRef.current.value
        forgetPassword(email)
            .then(() => {
                handleFirebaseSuccess("password-reset")
                e.target.reset()
            })
            .catch(error => {
                handleFirebaseError(error.code)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-indigo-500 to-primary p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex overflow-hidden">
                <div className=" w-full bg-white p-10 flex flex-col justify-center">
                    <form onSubmit={handleForgetPassword} className="space-y-2">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="user@email.com"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  "
                            />
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button onClick={()=> window.open("https://mail.google.com", "_blank")}
                                type="submit"
                                className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition"
                            >
                                Forget
                            </button>
                        </div>
                    </form>


                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            Don't have an account?
                            <Link to="/register" className="text-blue-400 hover:text-blue-500 hover:underline ml-1 font-semibold"> Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;