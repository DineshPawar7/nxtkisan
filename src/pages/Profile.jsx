import { useState, useEffect } from "react";

const getStoredUser = () => {
  try {
    const userString = localStorage.getItem("user");
    if (!userString || userString === "undefined") return {};
    return JSON.parse(userString);
  } catch (err) {
    console.error("Invalid user data in localStorage", err);
    return {};
  }
};

const Profile = () => {
  const storedUser = getStoredUser();

  const [username, setUsername] = useState(storedUser.name || "Guest User");
  const [email, setEmail] = useState(storedUser.email || "guest@example.com");
  const [profilePic, setProfilePic] = useState(
    storedUser.profilePic ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const updatedUser = getStoredUser();
    setUsername(updatedUser.name || "Guest User");
    setEmail(updatedUser.email || "guest@example.com");
    setProfilePic(
      updatedUser.profilePic ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    );
  }, []);


  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...storedUser, profilePic: reader.result };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setProfilePic(reader.result);
      window.dispatchEvent(new Event("profilePicUpdated"));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-xl mx-auto font-sans">
      <div className="flex items-center p-5 relative">
        <label htmlFor="profile-upload">
          <img
            src={profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-5 cursor-pointer object-cover border-2 border-gray-300 hover:opacity-80 transition-opacity duration-300"
          />
        </label>
        <input
          type="file"
          id="profile-upload"
          className="hidden"
          onChange={handleProfileUpload}
          accept="image/*"
        />
        <div className="flex-grow">
          <h2 className="text-xl font-bold">{username}</h2>
          <p className="text-gray-500 text-base">{email}</p>
          <p className="text-sm mt-1">Welcome to my profile!</p>
          {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5 border-t border-gray-200" />

      {/* 
      <div className="grid grid-cols-3 gap-1 p-2">
        <div className="relative cursor-pointer group">
          <img src="..." alt="Post" className="w-full rounded-md" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            Overlay Content
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default Profile;
