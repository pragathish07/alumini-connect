"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaQuestionCircle, FaComments, FaVideo, FaInfoCircle, FaBars, FaTimes , FaHome, FaUser} from 'react-icons/fa';
import Link from 'next/link';
import { ImProfile } from 'react-icons/im';
import { User } from 'lucide-react';

const menuItems = [
  { icon: FaHome, label: 'Home', href: '/dashboard' },
  { icon: FaUser, label: 'Common Info', href: '/dashboard/profile' },
  { icon: FaUserFriends, label: 'Connections', href: '/dashboard/connections' },
  { icon: FaQuestionCircle, label: 'Doubt Clarification', href: '/dashboard/doubts' },
  { icon: FaComments, label: 'Chats', href: '/dashboard/chats' },
  { icon: FaVideo, label: 'Video Calls', href: '/dashboard/videocall' },
  
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex">
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
      
    </div>
  );
}