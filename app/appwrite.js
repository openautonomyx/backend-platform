import { Client, Account, ID, Databases } from 'appwrite';

// Load environment variables with fallback for development
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://backend.unboxd.cloud/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '<PROJECT_ID>';

// Validate configuration
if (!endpoint || !projectId || projectId === '<PROJECT_ID>') {
  console.warn('Appwrite configuration missing. Please set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID in .env.local');
  // Don't throw in development to allow UI to load, but will fail when making actual requests
}

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export { ID };
