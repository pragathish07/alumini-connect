import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaQuestionCircle, FaComments, FaVideo, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const menuItems = [
  { icon: FaUserFriends, label: 'Connections', href: '/connections' },
  { icon: FaQuestionCircle, label: 'Doubt Clarification', href: '/doubts' },
  { icon: FaComments, label: 'Chats', href: '/chats' },
  { icon: FaVideo, label: 'Video Calls', href: '/videocall' },
  { icon: FaInfoCircle, label: 'Common Info', href: '/info' },
];

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex h-screen pt-16">
      <motion.div
        className="bg-gray-800 h-full shadow-lg"
        initial={{ width: '60px' }}
        animate={{ width: isExpanded ? '240px' : '60px' }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="w-full p-4 text-white hover:bg-gray-700 flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <motion.div
              className="flex items-center p-4 text-white hover:bg-gray-700 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="text-xl" />
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <div className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">Welcome to Your Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-white">Explore Connections</h2>
              <p className="text-white mb-4">Discover and connect with alumni and fellow students in your field.</p>
              <Link href="/connections" className="text-blue-400 hover:text-blue-300">Find connections &rarr;</Link>
            </div>
            <div className="bg-blue-900 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-white">Latest Opportunities</h2>
              <p className="text-white mb-4">Browse internships, job openings, and projects shared by alumni.</p>
              <Link href="/opportunities" className="text-blue-400 hover:text-blue-300">View opportunities &rarr;</Link>
            </div>
            <div className="bg-blue-900 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-white">Trending Discussions</h2>
              <p className="text-white mb-4">Join conversations on hot topics in your industry.</p>
              <Link href="/discussions" className="text-blue-400 hover:text-blue-300">See discussions &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}