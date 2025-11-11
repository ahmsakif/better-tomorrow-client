import React, { useState } from 'react';
// import logo from '../../assets/toytopia.png'
import { FaEye, FaEyeSlash, FaFacebook, FaInstagram, FaPhotoVideo, FaTwitter, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from 'sweetalert2';
import registerBg from '../../assets/register.jpg'
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import toast from 'react-hot-toast';
import {
  FaGoogle, FaFacebookF, FaApple, FaRegEnvelope,
} from 'react-icons/fa';
import { IoMdAttach } from "react-icons/io";
import useAxios from '../../Hooks/useAxios';

const Register = () => {

  const {
    user,
    createUser,
    signInWithGoogle,
    updateUserProfile,
    signOutUser,
    setLoading
  } = useAuth()

  const axiosInstance = useAxios()

  const [error, setError] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const photoURL = e.target.photoURL.value
    const email = e.target.email.value
    const password = e.target.password.value
    const terms = e.target.terms.checked
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).+$/;

    if (!passwordPattern.test(password)) return setError("Passowrd must be at least one Uppercase and one Lowercase")
    if (!terms) return toast.error("Please Accept our terms and conditions")

    // Reset Status: 
    setError("")

    createUser(email, password)
      .then((result) => {
        e.target.reset()
        const user = result.user
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log("Profile updated!");
            const newUser = {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            }
            // create user in database
            axiosInstance.post('/users', newUser)
              .then(data => {
                console.log(data.data);
              })
          })
          .catch(error => {
            handleFirebaseError(error)
          })

        // const newUser = {
        //   name: user.displayName,
        //   email: user.email,
        //   photoURL: user.photoURL,
        // }
        signOutUser()
        Swal.fire({
          title: "Account created successfully!",
          text: "Click below to login you account",
          icon: "success",
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#00a6a6",
        }).then(res => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        })
        setLoading(false)

        // // create user in database
        // axiosInstance.post('/users', newUser)
        //   .then(data => {
        //     console.log(data.data);
        //   })
      })
      .catch((error) => {
        setLoading(false)
        handleFirebaseError(error.code)
      })
  }
  if (user) {
    navigate("/");
    return;
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user
        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }

        console.log(result);
        setLoading(false)
        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true })
        handleFirebaseSuccess("google-login")

        // create user in database
        axiosInstance.post('/users', newUser)
          .then(data => {
            console.log(data.data);
          })

      })
      .catch((error) => {
        setLoading(false)
        handleFirebaseError(error.code)
      })
  }

  const handleShowPwd = (e) => {
    e.preventDefault()
    setShowPwd(!showPwd)
  }

  return (
    <div className="flex max-h-screen bg-white">
      {/* Left Side: Logo and Banner */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex">
        <img src={registerBg} className='h-full w-full overflow-hidden object-cover ' alt="" />
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full h-screen items-center justify-center lg:w-1/2 bg-base-100">
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-3xl font-semibold text-base-content">
            Welcome Back!
          </h2>
          <p className="mb-8 text-base-content">
            Connecting volunteers with communities in need across every corner of Bangladesh.
          </p>

          <form onSubmit={handleRegister}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-base-content">
                Name
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            {/* PhotoURL Input */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-base-content">
                Photo
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Give URL of your photo"
                  className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <IoMdAttach className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg rotate-45" />
              </div>
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-base-content">
                Email
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="mail@mail.com"
                  className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-base-content">
                Password
              </label>
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
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between text-sm text-base-content mb-6">
              <label className="flex items-center">
                <input type="checkbox" name="terms" className="mr-2" /> Accept our<span className='ml-1'><a href="#" className='hover:text-blue-500'>Terms & Conditions</a></span>
              </label>
              <Link to="/forgot-password" className="hover:underline hover:text-blue-500 cursor-pointer">
                Forgot password?
              </Link>
            </div>

            {
              error && <p className='text-red-500' >{error}</p>
            }

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-secondary py-3 px-4 text-center font-semibold text-white shadow-md transition duration-200 hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
            >
              Sign Up
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
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;