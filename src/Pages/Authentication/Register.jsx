import React, { useState } from "react";
import { 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaRegEnvelope, 
  FaLock 
} from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from "axios";
import registerBg from '../../assets/register.jpg';
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../Components/Loader/Loader';

const Register = () => {
  const { 
    user, 
    createUser, 
    signInWithGoogle, 
    updateUserProfile, 
    signOutUser, 
    setLoading, 
    loading 
  } = useAuth();

  const axiosInstance = useAxios();
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;
    const imageFile = form.image.files[0]; 
    
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).+$/;

    if (!imageFile) return toast.error("Please select a profile image.");
    if (!passwordPattern.test(password)) return setError("Password must contain at least one Uppercase and one Lowercase letter.");
    if (!terms) return toast.error("Please accept our terms and conditions.");

    setError("");
    const toastId = toast.loading("Processing registration...");

    try {
      // PART A: imgBB Upload logic
      const imageData = new FormData();
      imageData.append('image', imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imageData
      );

      const photoURL = imgRes.data.data.display_url;

      // PART B: Firebase Auth
      const result = await createUser(email, password);
      const firebaseUser = result.user;

      await updateUserProfile(name, photoURL);

      // PART C: Database Sync
      const newUser = { 
        name, 
        email: firebaseUser.email, 
        photoURL,
        createdAt: new Date().toISOString() 
      };
      await axiosInstance.post('/users', newUser);

      signOutUser();
      toast.dismiss(toastId);
      
      Swal.fire({
        title: "Account Created!",
        text: "Your node has been initialized. Please sign in.",
        icon: "success",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#10b981",
        customClass: { popup: 'rounded-[2.5rem]' }
      }).then(res => {
        if (res.isConfirmed) navigate("/login");
      });

    } catch (err) {
      toast.dismiss(toastId);
      setLoading(false);
      handleFirebaseError(err.code || "REGISTRATION_ERROR");
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const gUser = result.user;
        const newUser = { name: gUser.displayName, email: gUser.email, photoURL: gUser.photoURL };
        setLoading(false);
        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        handleFirebaseSuccess("google-login");
        axiosInstance.post('/users', newUser);
      })
      .catch((error) => {
        setLoading(false);
        handleFirebaseError(error.code);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen overflow-hidden bg-base-100">
      
      {/* Left Side: Visual Banner */}
      <div className="relative hidden w-1/2 lg:flex h-full overflow-hidden border-r border-base-200">
        <img src={registerBg} className="h-full w-full object-cover" alt="Community" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-primary/30 opacity-80" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-12 bg-black/40 backdrop-blur-md w-4/5 rounded-[3rem] border border-white/10 text-center">
          <h1 className="text-5xl font-black mb-6 italic tracking-tighter">Better Tomorrow</h1>
          <p className="text-xl font-body opacity-80 leading-relaxed">
            Empowering communities through active volunteerism across Bangladesh.
          </p>
        </div>
      </div>

      {/* Right Side: Form Module */}
      <div className="flex w-full h-full items-center justify-center p-8 lg:w-1/2 overflow-y-auto bg-base-100">
        <div className="w-full max-w-md py-10">
          <div className="mb-10">
            <h2 className="text-4xl font-black font-heading tracking-tight mb-2">Join Today</h2>
            <p className="text-base-content/50 text-sm font-medium uppercase tracking-widest">Register your profile</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-40 ml-2">Full Name</label>
              <div className="relative">
                <input required type="text" name="name" placeholder="Sakif Ahmed"
                  className="w-full rounded-2xl border border-base-300 bg-base-200/30 p-4 pl-12 focus:border-primary outline-none font-bold transition-all" />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-40 ml-2">Profile Avatar</label>
              <div className="relative">
                <input required type="file" name="image" accept="image/*"
                  className="file-input file-input-bordered w-full rounded-2xl bg-base-200/30 font-bold text-sm transition-all focus:outline-none h-14" />
                <IoCloudUploadOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-40 ml-2">Email</label>
              <div className="relative">
                <input required type="email" name="email" placeholder="mail@example.com"
                  className="w-full rounded-2xl border border-base-300 bg-base-200/30 p-4 pl-12 focus:border-primary outline-none font-bold transition-all" />
                <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-40 ml-2">Secure Password</label>
              <div className="relative">
                <input required type={showPwd ? "text" : "password"} name="password" placeholder="••••••••"
                  className="w-full rounded-2xl border border-base-300 bg-base-200/30 p-4 pl-12 focus:border-primary outline-none font-bold transition-all" />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary">
                  {showPwd ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex items-center text-xs font-bold text-base-content/60 cursor-pointer">
                <input type="checkbox" name="terms" className="checkbox checkbox-primary checkbox-xs mr-3 rounded-md" />
                Accept <span className="text-primary hover:underline ml-1">Terms & Conditions</span>
              </label>
              {error && <p className="text-error text-[10px] font-bold uppercase tracking-widest bg-error/5 p-2 rounded-lg text-center border border-error/10">{error}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-block h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20">
              Create Account
            </button>
          </form>

          {/* Single Full-Width Google Option */}
          <div className="my-10 flex items-center gap-4 opacity-20">
            <div className="flex-grow border-t border-base-content"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Or Connect With</span>
            <div className="flex-grow border-t border-base-content"></div>
          </div>

          <button 
            onClick={handleGoogleSignIn} 
            className="btn btn-outline border-base-300 w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-base-200 shadow-sm"
          >
            <FcGoogle size={24}/>
            <span className="uppercase text-xs tracking-widest">Continue with Google</span>
          </button>

          <p className="mt-10 text-center text-sm font-body text-base-content/50">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline uppercase tracking-tighter">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;