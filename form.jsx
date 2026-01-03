import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaChevronRight, FaChevronLeft, FaCheck } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth"; // Uncomment when AuthProvider is ready

// ⚠️ Replace with your actual key or use env variable
const image_hosting_key = "YOUR_IMGBB_API_KEY"; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinHR = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  // const { createUser, updateUserProfile } = useAuth(); // Uncomment this

  const { 
    register, 
    handleSubmit, 
    trigger, // This checks validation for specific fields
    formState: { errors } 
  } = useForm();

  // Define fields per step for validation
  const steps = [
    { fields: ["email", "password"], title: "Account Credentials" },
    { fields: ["fullName", "dateOfBirth"], title: "Personal Details" },
    { fields: ["companyName", "companyLogo", "package"], title: "Company Setup" }
  ];

  const handleNext = async () => {
    // Validate only the fields in the current step
    const isValid = await trigger(steps[currentStep].fields);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    try {
      const toastId = toast.loading("Creating your company workspace...");

      // 1. Upload Image to ImgBB
      const imageFile = { image: data.companyLogo[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
          headers: { 'content-type': 'multipart/form-data' }
      });
      const logoURL = res.data.data.display_url;

      // 2. Firebase Registration
      // await createUser(data.email, data.password);
      // await updateUserProfile(data.fullName, logoURL);

      // 3. Save to MongoDB
      const hrInfo = {
        name: data.fullName,
        email: data.email,
        role: "hr",
        companyName: data.companyName,
        companyLogo: logoURL,
        dateOfBirth: data.dateOfBirth,
        packageLimit: parseInt(data.package), // Ensure number
        subscription: "basic"
      };

      await axios.post('http://localhost:5000/users', hrInfo);

      toast.success("HR Account Created!", { id: toastId });
      navigate('/');

    } catch (error) {
      console.error(error);
      toast.error("Registration Failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 py-12 px-4">
      <div className="card w-full max-w-2xl shadow-xl bg-base-100 border border-gray-200 overflow-hidden">
        
        {/* Top Progress Bar (DaisyUI Steps) */}
        <div className="bg-base-100 pt-8 px-8">
            <ul className="steps w-full">
                <li className={`step ${currentStep >= 0 ? 'step-primary' : ''}`}>Login Info</li>
                <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Personal</li>
                <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Company</li>
            </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-2xl font-bold text-center font-heading text-primary mb-2">
            {steps[currentStep].title}
          </h2>

          {/* ANIMATED FORM CONTENT */}
          <div className="min-h-[300px]">
            
            {/* STEP 1: Email & Password */}
            {currentStep === 0 && (
              <motion.div 
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                className="space-y-4"
              >
                <div className="form-control">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" placeholder="hr@company.com" className="input input-bordered" 
                    {...register("email", { required: "Email is required" })} />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Password</span></label>
                  <input type="password" placeholder="Min 6 chars" className="input input-bordered" 
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })} />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Name & DOB */}
            {currentStep === 1 && (
              <motion.div 
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div className="form-control">
                  <label className="label"><span className="label-text">Full Name</span></label>
                  <input type="text" placeholder="John Doe" className="input input-bordered" 
                    {...register("fullName", { required: "Name is required" })} />
                  {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Date of Birth</span></label>
                  <input type="date" className="input input-bordered" 
                    {...register("dateOfBirth", { required: "Date of Birth is required" })} />
                  {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Company Details */}
            {currentStep === 2 && (
              <motion.div 
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div className="form-control">
                  <label className="label"><span className="label-text">Company Name</span></label>
                  <input type="text" placeholder="Tech Solutions Inc." className="input input-bordered" 
                    {...register("companyName", { required: "Company Name is required" })} />
                  {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
                </div>
                
                <div className="form-control">
                  <label className="label"><span className="label-text">Select Package</span></label>
                  <select className="select select-bordered w-full" {...register("package")}>
                     <option value="5">5 Members for $5 (Basic)</option>
                     <option value="10">10 Members for $8 (Standard)</option>
                     <option value="20">20 Members for $15 (Premium)</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Company Logo</span></label>
                  <input type="file" className="file-input file-input-bordered w-full" 
                    {...register("companyLogo", { required: "Logo is required" })} />
                   {errors.companyLogo && <span className="text-red-500 text-sm">{errors.companyLogo.message}</span>}
                </div>
              </motion.div>
            )}
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="card-actions justify-between mt-6">
            {/* Back Button */}
            {currentStep > 0 ? (
                <button type="button" onClick={handlePrev} className="btn btn-outline">
                    <FaChevronLeft className="mr-2" /> Back
                </button>
            ) : (
                <div></div> // Empty div to keep Next button to the right
            )}

            {/* Next / Submit Button */}
            {currentStep < steps.length - 1 ? (
                <button type="button" onClick={handleNext} className="btn btn-primary">
                    Next <FaChevronRight className="ml-2" />
                </button>
            ) : (
                <button type="submit" className="btn btn-primary">
                    Signup & Pay <FaCheck className="ml-2" />
                </button>
            )}
          </div>

          <p className="text-center mt-4 text-sm">
            Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default JoinHR;