import { Client, Account, ID } from 'appwrite';

const endpoint = 'https://backend.unboxd.cloud/v1';
const projectId = '<PROJECT_ID>';

if (!endpoint || !projectId || projectId === '<PROJECT_ID>') {
  throw new Error('Missing Appwrite endpoint and project ID');
}

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);

export { ID };
