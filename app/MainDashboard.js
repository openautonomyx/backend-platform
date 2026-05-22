import { useState, useEffect } from 'react';
import { account } from '@/app/appwrite';
import { getUserApps } from '@/lib/db';
import AppForm from '@/app/_components/AppForm';
import VisualBuilder from '@/app/_components/VisualBuilder';
import ComponentLibrary from '@/app/_components/ComponentLibrary';
import GovernanceDashboard from '@/app/_components/GovernanceDashboard';

export default function MainDashboard() {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedApp, setSelectedApp] = useState(null);

  // Check user authentication
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

  // Load user apps when authenticated
  useEffect(() => {
    if (user) {
      async function loadApps() {
        try {
          const userApps = await getUserApps(user.$id);
          setApps(userApps);
        } catch (err) {
          setError(err.message || 'Failed to load apps');
        }
      }

      loadApps();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await account.deleteSession({ sessionId: 'current' });
      setUser(null);
      setApps([]);
    } catch (err) {
      setError(err.message || 'Logout failed');
    }
  };

  const handleAppCreated = () => {
    // Refresh apps list after creation
    if (user) {
      getUserApps(user.$id).then(setApps);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-indigo-600 font-medium">Loading platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-indigo-800 mb-4">Welcome to AI-Native Enterprise App Builder</h1>
          <p className="text-indigo-600 mb-6">Please login to access the platform</p>
          <a 
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-indigo-800 text-white flex flex-col">
          <div className="p-4 border-b border-indigo-700">
            <h1 className="text-xl font-bold">AI Enterprise Builder</h1>
            <p className="text-sm text-indigo-200">SaaS in 60 Mins</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2 space-y-1">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
                { id: 'builder', name: 'App Builder', icon: '🧱' },
                { id: 'apps', name: 'My Apps', icon: '📱' },
                { id: 'governance', name: 'Governance', icon: '🛡️' },
                { id: 'ai', name: 'AI Studio', icon: '🤖' },
                { id: 'tenants', name: 'Tenants', icon: '🏢' },
                { id: 'settings', name: 'Settings', icon: '⚙️' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full text-left p-3 rounded flex items-center space-x-3 
                    ${activeModule === item.id 
                      ? 'bg-indigo-700' 
                      : 'hover:bg-indigo-700'}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-indigo-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{user.name?.[0] || user.email?.[0] || 'U'}</span>
              </div>
              <div>
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-xs text-indigo-200">Logged in</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeModule === 'dashboard' && 'Dashboard'}
                  {activeModule === 'builder' && 'App Builder'}
                  {activeModule === 'apps' && 'My Applications'}
                  {activeModule === 'governance' && 'Enterprise Governance'}
                  {activeModule === 'ai' && 'AI Studio'}
                  {activeModule === 'tenants' && 'Tenants & Teams'}
                  {activeModule === 'settings' && 'Settings'}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="text-xl">🔍</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="text-xl">📊</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <span className="text-xl">🔔</span>
                </button>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Dashboard View */}
            {activeModule === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Welcome to AI-Native Enterprise App Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Build enterprise applications in minutes with our AI-powered platform. Choose your approach:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">🎨</div>
                      <h4 className="font-medium mb-2">Visual Builder</h4>
                      <p className="text-sm text-gray-600 mb-3">Drag and drop to build your app</p>
                      <button 
                        onClick={() => setActiveModule('builder')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Start Building
                      </button>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">🤖</div>
                      <h4 className="font-medium mb-2">AI Generation</h4>
                      <p className="text-sm text-gray-600 mb-3">Let AI generate your app</p>
                      <button 
                        onClick={() => setActiveModule('ai')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Generate with AI
                      </button>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">📊</div>
                      <h4 className="font-medium mb-2">Governance</h4>
                      <p className="text-sm text-gray-600 mb-3">Manage roles and compliance</p>
                      <button 
                        onClick={() => setActiveModule('governance')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Manage Governance
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Applications</h3>
                  {apps.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't created any applications yet</p>
                      <button 
                        onClick={() => setActiveModule('builder')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                      >
                        Create Your First App
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {apps.map(app => (
                        <div 
                          key={app.$id} 
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            setSelectedApp(app);
                            setActiveModule('builder');
                          }}
                        >
                          <h4 className="font-semibold text-gray-900 mb-1">{app.name || 'Unnamed App'}</h4>
                          <p className="text-sm text-gray-600 mb-2">{app.description || 'No description'}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {app.status || 'draft'}
                            </span>
                            <span className="ml-2">
                              Updated: {new Date(app.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setActiveModule('builder')}
                        className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <span className="text-xl">➕</span>
                        <span>Create New App</span>
                      </button>
                      <button 
                        onClick={() => setActiveModule('ai')}
                        className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <span className="text-xl">🤖</span>
                        <span>AI Code Generation</span>
                      </button>
                      <button 
                        onClick={() => setActiveModule('governance')}
                        className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <span className="text-xl">🛡️</span>
                        <span>Manage Permissions</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applications</span>
                        <span className="font-semibold">{apps.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Version</span>
                        <span className="font-semibold">1.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="font-semibold text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* App Builder View */}
            {activeModule === 'builder' && (
              <div className="bg-white rounded-xl shadow-sm">
                <VisualBuilder 
                  userId={user.$id}
                  appId={selectedApp?.$id}
                />
              </div>
            )}

            {/* My Apps View */}
            {activeModule === 'apps' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Your Applications</h3>
                    <button 
                      onClick={() => setActiveModule('builder')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                    >
                      Create New App
                    </button>
                  </div>
                  
                  {apps.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No applications found. Create your first app!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {apps.map(app => (
                        <div key={app.$id} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{app.name || 'Unnamed App'}</h4>
                          <p className="text-sm text-gray-600 mb-4">{app.description || 'No description'}</p>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedApp(app);
                                setActiveModule('builder');
                              }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Edit
                            </button>
                            <button 
                              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Governance View */}
            {activeModule === 'governance' && (
              <GovernanceDashboard userId={user.$id} />
            )}

            {/* AI Studio View */}
            {activeModule === 'ai' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Studio</h3>
                  <p className="text-gray-600 mb-6">Generate code, UI components, and complete applications using AI</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Code Generation</h4>
                      <p className="text-sm text-gray-600 mb-4">Generate backend and frontend code</p>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm">
                        Generate Code
                      </button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">UI Generation</h4>
                      <p className="text-sm text-gray-600 mb-4">Create UI components with AI</p>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm">
                        Generate UI
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation History</h3>
                  <p className="text-gray-500">Your AI-generated content will appear here</p>
                </div>
              </div>
            )}

            {/* Tenants View */}
            {activeModule === 'tenants' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tenants & Teams</h3>
                <p className="text-gray-600 mb-6">Manage your organization's tenants and teams</p>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tenant Management</h4>
                  <p className="text-sm text-gray-600 mb-4">Create and manage organizational tenants</p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm">
                    Create Tenant
                  </button>
                </div>
              </div>
            )}

            {/* Settings View */}
            {activeModule === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text"
                      value={user.name || ''}
                      readOnly
                      className="w-full max-w-md border p-2 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email"
                      value={user.email || ''}
                      readOnly
                      className="w-full max-w-md border p-2 rounded bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}