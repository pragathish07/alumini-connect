"use client";

import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { FiUserPlus, FiCalendar, FiBriefcase } from "react-icons/fi"; // Icons for notifications

export default function Notifications() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <main className="container mx-auto px-4 py-8">
        {session ? <NotificationList /> : <LoggedOutNotification />}
      </main>
    </div>
  );
}

function LoggedOutNotification() {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-6">You are not signed in</h2>
      <p className="text-lg mb-6">Please sign in to view your notifications.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg hover:bg-blue-600"
        onClick={async () => {await signIn("google")}}
      >
        Sign In
      </motion.button>
    </div>
  );
}

function NotificationList() {
  const notifications = [
    {
      id: 1,
      title: "New Connection Request",
      message: "John Doe has sent you a connection request.",
      icon: <FiUserPlus className="text-blue-500" />,
      time: "5 minutes ago",
    },
    {
      id: 2,
      title: "Event Reminder",
      message: "Don't forget to join the Alumni Meetup tomorrow at 6 PM.",
      icon: <FiCalendar className="text-green-500" />,
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "Job Opportunity",
      message: "A new job opportunity has been posted by Jane Smith.",
      icon: <FiBriefcase className="text-yellow-500" />,
      time: "1 day ago",
    },
  ];

  return (
    <section>
      <h1 className="text-4xl font-bold text-white mb-12 text-center">
        Notifications
      </h1>
      <ul className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg divide-y divide-gray-700">
        {notifications.map((notification, index) => (
          <motion.li
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center py-6 px-4 hover:bg-gray-700 transition duration-300"
          >
            {/* Notification Icon */}
            <div className="text-2xl mr-4">
              {notification.icon}
            </div>
            {/* Notification Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-400">{notification.message}</p>
            </div>
            {/* Time */}
            <div className="text-sm text-white">{notification.time}</div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
