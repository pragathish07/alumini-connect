"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <MissionSection />
        <VisionSection />
        <TeamSection />
        <CTASection />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">About Alumni Connect</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Alumni Connect is a platform designed to bridge the gap between alumni
          and current students. We believe in fostering relationships that
          inspire, guide, and shape the future of our academic community.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src="/about-hero-image.png"
          alt="Connecting Alumni and Students"
          width={600}
          height={400}
          className="rounded-lg shadow-xl"
        />
      </motion.div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl my-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Our mission is to create a platform where students can connect with
          alumni for mentorship, guidance, and opportunities. We aim to empower
          the next generation with the knowledge and networks of those who have
          gone before them.
        </p>
      </motion.div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
        <p className="text-xl max-w-2xl mx-auto">
          We envision a future where every student has access to the wisdom,
          experiences, and networks of alumni. Together, we can foster a
          collaborative, supportive, and inclusive environment for professional
          growth.
        </p>
      </motion.div>
    </section>
  );
}

function TeamSection() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Chief Technology Officer",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full mx-auto mb-4 w-24 h-24"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="opacity-75">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Join Us in Shaping the Future</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Be a part of a community that supports, guides, and inspires each
          other. Whether you&apos;re an alum or a student, there&apos;s always something
          to give and receive. Join Alumni Connect today!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={async () => await signIn("google")}
          className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg hover:bg-blue-600"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}
