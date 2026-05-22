"use client";

import { useEffect, useState } from 'react';
import { account, ID } from './appwrite';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

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
    try {
      await account.createEmailPasswordSession({ email, password });
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  async function register() {
    setError('');
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
    }
  }

  async function logout() {
    setError('');
    try {
      await account.deleteSession({ sessionId: 'current' });
      setUser(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Arial, sans-serif', maxWidth: 420 }}>
      <h1>Appwrite Auth Demo</h1>

      {user ? (
        <div>
          <p>Logged in as {user.name || user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={() => login(email, password)}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: 16 }}>
          {error}
        </p>
      )}
    </main>
  );
}
