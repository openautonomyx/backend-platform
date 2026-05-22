"use client";

import { useEffect, useState } from 'react';
import { account, ID } from './appwrite';
import MainDashboard from './MainDashboard';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  }

  async function login(email, password) {
    setError('');
    setLoading(true);
    try {
      await account.createEmailPasswordSession({ email, password });
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function register() {
    setError('');
    setLoading(true);
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      await login(email, password);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setError('');
    setLoading(true);
    try {
      await account.deleteSession({ sessionId: 'current' });
      setUser(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return <MainDashboard user={user} logout={logout} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">AI-Native Enterprise App Builder</h1>
          <p className="text-indigo-600">SaaS in 60 Mins</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password || !name) {
              setError('Please fill in all fields');
              return;
            }
            register();
          }} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-indigo-500">Already have an account?</p>
            <button 
              onClick={() => login(email, password)}
              disabled={!email || !password || loading}
              className="text-indigo-600 hover:text-indigo-800 font-medium underline disabled:opacity-50"
            >
              Login instead
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border-l-4 border-red-400 p-3 rounded">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
