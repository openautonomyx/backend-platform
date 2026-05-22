import { useEffect, useState } from 'react';
import { account } from '@/app/appwrite';
import { initializeDatabase, getUserApps, createApp } from '@/lib/db';
import AppForm from '@/app/_components/AppForm';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dbInitialized, setDbInitialized] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Check user login status
  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  // Initialize database and fetch apps when user logs in
  useEffect(() => {
    if (!user) return;

    async function loadData() {
      try {
        // Initialize database (only once per session)
        if (!dbInitialized) {
          await initializeDatabase();
          setDbInitialized(true);
        }

        // Fetch user's apps
        const userApps = await getUserApps(user.$id);
        setApps(userApps);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, dbInitialized]);

  const handleAppCreated = () => {
    setShowForm(false);
    // Refresh apps list
    if (user && dbInitialized) {
      getUserApps(user.$id).then(setApps);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please <a href="/" className="text-blue-600 underline">log in</a> to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="https://via.placeholder.com/40" alt="App Builder" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-gray-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                  <a href="/dashboard" className="text-indigo-600 font-semibold px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button onClick={() => account.deleteSession({ sessionId: 'current' })} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">App Builder Dashboard</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Create New App
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <AppForm onSuccess={handleAppCreated} />
            </div>
          )}

          <div className="space-y-6">
            {apps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't built any apps yet. Click "Create New App" to get started!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {apps.map(app => (
                  <div key={app.$id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{app.name || 'Unnamed App'}</h2>
                      <p className="text-gray-600 mb-4">{app.description || 'No description provided'}</p>
                      <div className="flex items-center text-sm">
                        <span className="px-2 py-1 text-xs rounded-full 
                          {app.status === 'published' ? 'bg-green-100 text-green-800' :
                           app.status === 'archived' ? 'bg-gray-100 text-gray-600' :
                           'bg-blue-100 text-blue-800'}"
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <span className="ml-3 text-gray-500">
                          {/* Format date - simplified */}
                          {new Date(app.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}