import { Client, Account, ID } from 'appwrite';

const endpoint = 'https://<REGION>.cloud.appwrite.io/v1';
const projectId = '<PROJECT_ID>';

if (!endpoint || !projectId) {
  throw new Error('Missing Appwrite endpoint and project ID');
}

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);

export { ID };
