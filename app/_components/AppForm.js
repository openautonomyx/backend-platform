import { useState } from 'react';
import { createApp, updateApp } from '@/lib/db';

export default function AppForm({ appId = null, onSuccess }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If editing an app, we would load the app data here
  // For simplicity, we'll assume the app data is passed via props or fetched in the page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (appId) {
        // Update existing app
        await updateApp(appId, { name, description, status });
      } else {
        // Create new app
        // Note: In a real app, we would get the userId from the authentication context
        // For now, we'll use a placeholder - in the page we'll get it from the user
        const userId = 'current-user-id'; // This should come from the auth context
        await createApp(userId, { name, description, status });
      }
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to save app');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          App Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter app name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Describe your app"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Saving...' : appId ? 'Update App' : 'Create App'}
      </button>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-400 p-3 rounded">
          {error}
        </p>
      )}
    </form>
  );
}