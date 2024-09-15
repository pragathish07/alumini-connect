import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="w-full flex justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen p-0 m-0">
      <div className="max-w-6xl w-full px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Explore Connections</h2>
            <p className="text-white mb-4">Discover and connect with alumni and fellow students in your field.</p>
            <Link href="/connections" className="text-blue-400 hover:text-blue-300">Find connections &rarr;</Link>
          </div>
          <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Latest Opportunities</h2>
            <p className="text-white mb-4">Browse internships, job openings, and projects shared by alumni.</p>
            <Link href="/opportunities" className="text-blue-400 hover:text-blue-300">View opportunities &rarr;</Link>
          </div>
          <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Trending Discussions</h2>
            <p className="text-white mb-4">Join conversations on hot topics in your industry.</p>
            <Link href="/discussions" className="text-blue-400 hover:text-blue-300">See discussions &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}