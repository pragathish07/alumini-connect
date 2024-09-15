"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEdit, FaUpload } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("/default-profile.png");


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
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-700 object-cover"
            />
            <label htmlFor="upload-button" className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="First Name"
 
              className="flex-grow bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
            />
            <Input
              placeholder="Last Name"
 
              className="flex-grow bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
            />
          </div>

          <Input
            placeholder="College"

            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />

          <Input
            placeholder="Location"

            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />

          <Input
            placeholder="Skills (e.g., JavaScript, React, Python)"

            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />
          <Input
            placeholder="Area of Interest"
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />

          {/* Additional necessary fields like bio, role, etc. */}
          <Textarea
            placeholder="Bio"
            /* value={bio}
            onChange={(e) => setBio{e.target.value}} */
            className="w-full bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <FaEdit className="mr-2" /> Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
