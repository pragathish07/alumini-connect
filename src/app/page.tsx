"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      
      <main className="">
        {session ? redirect("/dashboard") : <LoggedOutHome />}
      </main>
    </div>
  );
}

function LoggedOutHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 text-white"
      >
        <h1 className="text-5xl font-bold mb-6">Welcome to Alumni Connect</h1>
        <p className="text-xl mb-8">Connect with alumni, get advice, and shape your future!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg hover:bg-blue-600"
          onClick={() => signIn("google")}
        >
          Get Started
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-1/2 mt-12 md:mt-0"
      >
        <Image src="/hero-image.png" alt="Alumni networking" width={600} height={400} className="rounded-lg shadow-xl" />
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { title: "Connect with Alumni", description: "Network with successful graduates from your college.", icon: "🤝" },
    { title: "Get Expert Advice", description: "Receive guidance from experienced professionals in your field.", icon: "💡" },
    { title: "Explore Opportunities", description: "Discover internships and job openings shared by alumni.", icon: "🚀" },
  ];

  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl my-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Why Choose Alumni Connect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md text-white"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "John Doe", role: "Software Engineer", quote: "Alumni Connect helped me land my dream job!", avatar: "/avatar1.png" },
    { name: "Jane Smith", role: "Marketing Manager", quote: "The advice I received was invaluable for my career growth.", avatar: "/avatar2.png" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md text-white"
            >
              <div className="flex items-center mb-4">
                <Image src={testimonial.avatar} alt={testimonial.name} width={60} height={60} className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm opacity-75">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl my-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">Ready to Connect?</h2>
        <p className="text-xl mb-8 text-white">Join Alumni Connect today and start shaping your future!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white hover:bg-blue-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg"
          onClick={() => signIn("google")}
        >
          Sign Up Now
        </motion.button>
      </div>
    </section>
  );
}

