import React, { useEffect, useRef, useState } from 'react';
import { 
  FaRegEnvelope, 
  FaEyeSlash, 
  FaEye, 
  FaLock, 
  FaUserFriends 
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import loginBg from '../../assets/register-bg.jpg';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../Components/Loader/Loader';

const Login = () => {
  const {
    signInUser,
    signInWithGoogle,
    setLoading,
    user,
    loading,
  } = useAuth();

  const axiosInstance = useAxios();
  const [showPwd, setShowPwd] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const emailRef = useRef();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Mandatory Criteria: Demo Credential Function
  const handleDemoLogin = () => {
    const demoEmail = "user@demo.com";
    const demoPass = "Demo123456";
    
    if (emailRef.current) emailRef.current.value = demoEmail;
    const passwordInput = document.getElementsByName('password')[0];
    if (passwordInput) passwordInput.value = demoPass;
    
    handleFirebaseSuccess("demo-filled");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      handleFirebaseError("auth/missing-fields");
      return;
    }

    signInUser(email, password)
      .then((user) => {
        e.target.reset();
        handleFirebaseSuccess("login");
        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch(error => {
        handleFirebaseError(error.code);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        axiosInstance.post('/users', newUser);
        setLoading(false);
        handleFirebaseSuccess("google-login");
        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch(error => {
        handleFirebaseError(error.code);
        setLoading(false);
      });
  };

  if (loading) return <Loader></Loader>;

  return (
    // Fixed height container prevents overall page scroll
    <div className="flex h-screen overflow-hidden bg-base-100">
      
      {/* Left Side: Professional Banner */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex border-r border-base-200">
        <img src={loginBg} className='h-full w-full object-cover' alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-12 bg-black/40 backdrop-blur-md w-4/5 rounded-[3rem] border border-white/10 text-center">
          <h1 className='text-5xl font-black mb-6 italic tracking-tighter'>Better Tomorrow</h1>
          <p className='text-xl font-body opacity-80 leading-relaxed'>
            Connecting volunteers with communities across every corner of Bangladesh.
          </p>
        </div>
      </div>

      {/* Right Side: Form Module with Internal Scroll */}
      <div className="flex w-full h-full items-center justify-center p-8 lg:w-1/2 bg-base-100 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-md py-10">
          <div className="mb-10">
            <h2 className="text-4xl font-black font-heading tracking-tight mb-2 text-base-content">
              Welcome Back
            </h2>
            <p className="text-base-content/50 text-sm font-medium uppercase tracking-widest">
              Access your management console
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-40 ml-2">Email Address</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="mail@example.com"
                  className="w-full rounded-2xl border border-base-300 bg-base-200/30 p-4 pl-12 focus:border-primary outline-none font-bold transition-all"
                />
                <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 text-lg" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-40 ml-2">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-base-300 bg-base-200/30 p-4 pl-12 focus:border-primary outline-none font-bold transition-all"
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 text-lg" />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                >
                  {showPwd ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:underline uppercase tracking-tighter">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
            >
              Sign In
            </button>
          </form>

          {/* Single Full-Width Google Option */}
          <div className="my-10 flex items-center gap-4 opacity-20">
            <div className="flex-grow border-t border-base-content"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Or Login With</span>
            <div className="flex-grow border-t border-base-content"></div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn} 
              className="btn btn-outline border-base-300 w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-base-200 shadow-sm"
            >
              <FcGoogle size={24}/>
              <span className="uppercase text-xs tracking-widest">Continue with Google</span>
            </button>

            {/* Mandatory Criteria: Demo Credentials Button */}
            <button 
              type="button"
              onClick={handleDemoLogin} 
              className="w-full flex items-center justify-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-2xl hover:bg-primary/20 transition-all text-xs font-black uppercase tracking-widest text-primary"
            >
              <FaUserFriends /> Quick Demo Access
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-body text-base-content/50">
            New to the movement?{' '}
            <Link to='/register' className="font-black text-primary hover:underline uppercase tracking-tighter ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;