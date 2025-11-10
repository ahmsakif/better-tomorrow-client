import React, { useRef, useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaRegEnvelope, FaEyeSlash, FaEye } from 'react-icons/fa';
import loginBg from '../../assets/register-bg.jpg'
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';

const Login = () => {


  const {
    signInUser,
    signInWithGoogle,
    setLoading,
    user
  } = useAuth()

  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const emailRef = useRef()

  if (user) {
    navigate("/");
    return;
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    signInUser(email, password)
      .then(() => {
        e.target.reset()
        handleFirebaseSuccess("login")
        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true })
        setLoading(false)
      })
      .catch(error => {
        handleFirebaseError(error.code)
        setLoading(false)
      })
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        setLoading(false)
        handleFirebaseSuccess("google-login")
        const from = location?.state || "/";
        navigate(from, { replace: true })
      })
      .catch(error => {
        handleFirebaseError(error.code)
        setLoading(false)
      })
  }


  const handleShowPwd = (e) => {
    e.preventDefault()
    setShowPwd(!showPwd)
  }


  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Logo and Banner */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex">
        <img src={loginBg} className='h-full w-full overflow-hidden object-cover ' alt="" />
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 bg-base-100">
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-3xl font-semibold text-base-content">
            Welcome Back!
          </h2>
          <p className="mb-8 text-base-content">
            Connecting volunteers with communities in need across every corner of Bangladesh.
          </p>

          <form onSubmit={handleSignIn}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-base-content">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email" 
                  ref={emailRef}
                  placeholder="mail@mail.com"
                  className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                required
                type={showPwd ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              {
                showPwd
                  ? <button onClick={handleShowPwd}><FaEye className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /></button>
                  : <button onClick={handleShowPwd} ><FaEyeSlash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /></button>
              }

            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-secondary py-3 px-4 text-center font-semibold text-white shadow-md transition duration-200 hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or sign in with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center gap-4">
            <button onClick={handleGoogleSignIn} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl text-gray-500 transition duration-200 hover:bg-gray-50">
              <FaGoogle />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl text-blue-600 transition duration-200 hover:bg-gray-50">
              <FaFacebookF />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl text-gray-500 transition duration-200 hover:bg-gray-50">
              <FaApple />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to='/register' className="font-semibold text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;