"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaUserPlus } from "react-icons/fa";

type Profile = {
  id: number;
  name: string;
  college: string;
  company: string;
  location: string;
  role: string;
  imageUrl: string;
};

const staticProfiles: Profile[] = [
  { id: 1, name: "Amit Kumar", college: "Indian Institute of Technology, Bombay", company: "Reliance Industries", location: "Mumbai, Maharashtra", role: "Software Engineer", imageUrl: "https://randomuser.me/api/portraits/men/10.jpg" },
  { id: 2, name: "Priya Sharma", college: "Indian Institute of Management, Bangalore", company: "Flipkart", location: "Bangalore, Karnataka", role: "Business Analyst", imageUrl: "https://randomuser.me/api/portraits/women/11.jpg" },
  { id: 3, name: "Ravi Patel", college: "Indian Institute of Technology, Delhi", company: "HCL Technologies", location: "New Delhi, Delhi", role: "Systems Engineer", imageUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
  { id: 4, name: "Sanya Gupta", college: "Delhi University", company: "Zomato", location: "Gurgaon, Haryana", role: "Marketing Manager", imageUrl: "https://randomuser.me/api/portraits/women/13.jpg" },
  { id: 5, name: "Rajesh Singh", college: "Banaras Hindu University", company: "Tata Motors", location: "Varanasi, Uttar Pradesh", role: "Mechanical Engineer", imageUrl: "https://randomuser.me/api/portraits/men/14.jpg" },
  { id: 6, name: "Anjali Mehta", college: "Jawaharlal Nehru University", company: "Infosys", location: "Bangalore, Karnataka", role: "Human Resource Manager", imageUrl: "https://randomuser.me/api/portraits/women/15.jpg" },
  { id: 7, name: "Karthik Reddy", college: "Osmania University", company: "Microsoft", location: "Hyderabad, Telangana", role: "Cloud Engineer", imageUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
  { id: 8, name: "Sneha Kapoor", college: "University of Rajasthan", company: "Adani Group", location: "Jaipur, Rajasthan", role: "Project Manager", imageUrl: "https://randomuser.me/api/portraits/women/17.jpg" },
  { id: 9, name: "Vikas Menon", college: "Anna University", company: "Zoho Corporation", location: "Chennai, Tamil Nadu", role: "Software Developer", imageUrl: "https://randomuser.me/api/portraits/men/18.jpg" },
  { id: 10, name: "Neha Verma", college: "Jadavpur University", company: "Wipro", location: "Kolkata, West Bengal", role: "Data Scientist", imageUrl: "https://randomuser.me/api/portraits/women/19.jpg" },
];


const colleges = ["All", "IIT Bombay", "IIT Delhi", "IIM Bangalore", "Jawaharlal Nehru University", "BITS Pilani"];
const companies = ["All", "TCS", "Infosys", "Wipro", "Reliance Industries", "Flipkart"];
const locations = ["All", "Mumbai", "Bangalore", "New Delhi", "Hyderabad", "Gurgaon"];


export default function ConnectionsPage() {
  const [profiles, setProfiles] = useState(staticProfiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const handleSearch = () => {
    let filteredProfiles = staticProfiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (collegeFilter !== "All") {
      filteredProfiles = filteredProfiles.filter((profile) => profile.college === collegeFilter);
    }
    if (companyFilter !== "All") {
      filteredProfiles = filteredProfiles.filter((profile) => profile.company === companyFilter);
    }
    if (locationFilter !== "All") {
      filteredProfiles = filteredProfiles.filter((profile) => profile.location === locationFilter);
    }

    setProfiles(filteredProfiles);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Connect with Alumni</h1>

        <div className="mb-8 bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
          <div className="flex flex-wrap gap-4 mb-4">
            <Input
              placeholder="Search by name or role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
            />

            {/* College Filter */}
            <label htmlFor="" className="">College</label>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="bg-blue-800 bg-opacity-50 text-white border-blue-700 p-2"
            >
              {colleges.map((college) => (
                <option key={college} value={college} className="p-2">
                  {college}
                </option>
              ))}
            </select>

            {/* Company Filter */}
            <label htmlFor="" className="">Company</label>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="bg-blue-800 bg-opacity-50 text-white border-blue-700 p-2"
            >
              {companies.map((company) => (
                <option key={company} value={company} className="p-2">
                  {company}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <label htmlFor="" className="">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-blue-800 bg-opacity-50 text-white border-blue-700 p-2"
            >
              {locations.map((location) => (
                <option key={location} value={location} className="p-2">
                  {location}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <FaSearch className="mr-2" /> Search
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src={profile.imageUrl} alt={profile.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-blue-300">{profile.role}</p>
                </div>
              </div>
              <p className="mb-2">
                <strong>College:</strong> {profile.college}
              </p>
              <p className="mb-2">
                <strong>Company:</strong> {profile.company}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {profile.location}
              </p>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                <FaUserPlus className="mr-2" /> Connect
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
