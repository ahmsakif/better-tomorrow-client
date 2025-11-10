import toast from "react-hot-toast";


export const handleFirebaseSuccess = (type) => {
  if (type === "login") {
    toast.success("Login successful! 👋");
  } 
  else if (type === "google-login") {
    toast.success("Logged in with Google! 🌐");
  } 
  else if (type === "logout") {
    toast.success("You have logged out successfully.");
  } 
  else if (type === "password-reset") {
    toast.success("Password reset email sent! Check your inbox. 📩");
  } 
  else if (type === "email-update") {
    toast.success("Email updated successfully! ✅");
  } 
  else if (type === "profile-update") {
    toast.success("Profile updated successfully! ✨");
  } 
  else if (type === "delete-account") {
    toast.success("Account deleted successfully.");
  } 
  else {
    toast.success("Operation completed successfully! ✅");
  }
};
