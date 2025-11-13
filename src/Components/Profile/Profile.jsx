import React, { useEffect, useState } from 'react';
import avatar from "../../assets/user.png";
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import ShortcutCards from '../ShortcutCards/ShortcutCads';
import Loader from '../Loader/Loader';

const Profile = () => {
  const { user, loading, signOutUser, updateUserProfile, setLoading } = useAuth()
  const [profile, setProfile] = useState({
    displayName: "",
    phoneNumber: "",
    photoURL: "",
  });
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (user) {
      setProfile({
        displayName: user?.displayName || "",
        phoneNumber: user?.phoneNumber || "",
        photoURL: user?.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    updateUserProfile(profile.displayName, profile.photoURL, profile.phoneNumber)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated",
          confirmButtonText: "OK",
        });
        setIsEditing(false);
        setLoading(false);
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: error.code,
          confirmButtonText: "OK",
        });
        setLoading(false);
      })
      .finally(() => setSaving(false));
  };

  if (loading) return <Loader />;

  if (!user) return <span>No user logged in</span>;

  return (
    <div className="flex flex-col items-center justify-center my-16 px-4">
      <title>Profile</title>
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-secondary to-blue-800 text-white flex flex-col justify-center items-center p-10">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
            <img
              src={profile.photoURL || avatar}
              alt={profile.displayName || "User Avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">{profile.displayName || "Edit Your Name"}</h2>
          <p className="text-lg opacity-90">{user?.email}</p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center relative">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile</h3>

          {/* Edit / Cancel Button */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold underline"
            >
              <FaEdit /> {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Form */}
          <div className="space-y-4 mt-6">
            {/* Name */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label className="font-semibold w-32">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <span className="text-gray-700">{profile.displayName}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label className="font-semibold w-32">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <span className="text-gray-700">{profile.phoneNumber || "Unavailable"}</span>
              )}
            </div>

            {/* Photo URL */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <label className="font-semibold w-32">Photo URL</label>
              {isEditing ? (
                <input
                  type="text"
                  name="photoURL"
                  value={profile.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <span className="text-gray-700 line-clamp-2">{profile.photoURL}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn w-full md:w-1/2 bg-secondary hover:bg-secondary/80 text-white"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    signOutUser();
                    navigate("/");
                  }}
                  className="btn w-full md:w-1/2 bg-primary hover:bg-red-500 text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

        <ShortcutCards></ShortcutCards>
    </div>
  );
};

export default Profile;
