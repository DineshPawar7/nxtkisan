import React from "react";

const ProfileInfo = ({ userImage, username }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={userImage}
        alt="Profile"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h4 className="font-bold text-lg">{username}</h4>
      </div>
    </div>
  );
};

export default ProfileInfo;
