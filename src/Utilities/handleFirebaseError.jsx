import toast from "react-hot-toast";


export const handleFirebaseError = (code) => {
  if (code === "auth/invalid-email") {
    toast.error("Invalid email address. Please check your input.");
  } 
  else if (code === "auth/user-disabled") {
    toast.error("This account has been disabled. Please contact support.");
  } 
  else if (code === "auth/user-not-found") {
    toast.error("No user found with this email. Please sign up first.");
  } 
  else if (code === "auth/wrong-password") {
    toast.error("Incorrect password. Please try again.");
  } 
  else if (code === "auth/email-already-in-use") {
    toast.error("This email is already in use. Please use a different one.");
  } 
  else if (code === "auth/weak-password") {
    toast.error("Password is too weak. Use at least 6 characters.");
  } 
  else if (code === "auth/missing-password") {
    toast.error("Please enter your password.");
  } 
  else if (code === "auth/too-many-requests") {
    toast.error("Too many login attempts. Please try again later.");
  } 
  else if (code === "auth/network-request-failed") {
    toast.error("Network error. Check your internet connection.");
  } 
  else if (code === "auth/popup-blocked") {
    toast.error("Popup blocked. Please allow popups in your browser.");
  } 
  else if (code === "auth/popup-closed-by-user") {
    toast.error("Sign-in popup closed before completing the process.");
  } 
  else if (code === "auth/cancelled-popup-request") {
    toast.error("Sign-in request was cancelled. Please try again.");
  } 
  else if (code === "auth/unauthorized-domain") {
    toast.error("This domain is not authorized for authentication.");
  } 
  else if (code === "auth/operation-not-allowed") {
    toast.error("This sign-in method is currently disabled.");
  } 
  else if (code === "auth/requires-recent-login") {
    toast.error("Please sign in again before performing this action.");
  } 
  else if (code === "auth/invalid-credential") {
    toast.error("Invalid credentials. Please try again.");
  } 
  else if (code === "auth/invalid-verification-code") {
    toast.error("Invalid verification code. Please try again.");
  } 
  else if (code === "auth/invalid-verification-id") {
    toast.error("Invalid verification ID. Please try again.");
  } 
  else if (code === "auth/missing-email") {
    toast.error("Please enter your email address.");
  } 
  else if (code === "auth/account-exists-with-different-credential") {
    toast.error("An account already exists with the same email using different credentials.");
  } 
  else if (code === "auth/credential-already-in-use") {
    toast.error("This credential is already associated with another account.");
  } 
  else if (code === "auth/invalid-api-key") {
    toast.error("Invalid API key. Please check your Firebase configuration.");
  } 
  else if (code === "auth/app-deleted") {
    toast.error("This app instance has been deleted. Please refresh the page.");
  } 
  else if (code === "auth/internal-error") {
    toast.error("An internal error occurred. Please try again later.");
  } 
  else {
    toast.error("Something went wrong. Please try again.");
  }
};
