"use client";

import React, { useState } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSession } from "next-auth/react";


export default function ProfilePage() {
  const { data: session } = useSession();

  const [profileImage, setProfileImage] = useState(session?.user?.image || "https://avatar.iran.liara.run/public");
  
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, like updating profile data in a database
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-4xl mx-auto w-full bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-700 object-cover"
            />
            <label
              htmlFor="upload-button"
              className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer transition-colors duration-200"
            >
              <FaUpload />
            </label>
            <input
              type="file"
              id="upload-button"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <input
              placeholder="First Name"
              defaultValue={session?.user?.name?.split(" ")[0]} // Auto-fill with OAuth first name
              className="flex-grow bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out"
            />
            <input
              placeholder="Last Name"
              defaultValue={session?.user?.name?.split(" ")[1]} // Auto-fill with OAuth last name
              className="flex-grow bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out"
            />
          </div>

          <input
            placeholder="Email"
            defaultValue={session?.user?.email || ""} // Auto-fill with OAuth email
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out"
            readOnly // Make email read-only to prevent changes
          />
          <input
            placeholder="Location"
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out"
            readOnly // Make email read-only to prevent changes
          />
          <input
            placeholder="Skils (e.g.,Javascript,Python,Java)"
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out"
            readOnly // Make email read-only to prevent changes
          />
          <input
            placeholder="Area Of Interests"
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out"
            readOnly // Make email read-only to prevent changes
          />


          <textarea
            placeholder="Bio"
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-white placeholder-opacity-90 border border-blue-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out resize-none h-24"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200 ease-in-out flex items-center justify-center"
          >
            <FaEdit className="mr-2" /> Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
