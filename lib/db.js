import { databases } from '../app/appwrite';
import { ID, Query } from 'appwrite';

// Database configuration
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '<DATABASE_ID>';
const APPS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPS_COLLECTION_ID || '<APPS_COLLECTION_ID>';
const COMPONENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPONENTS_COLLECTION_ID || '<COMPONENTS_COLLECTION_ID>';
const TEMPLATES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TEMPLATES_COLLECTION_ID || '<TEMPLATES_COLLECTION_ID>';

// NOTE:
// Production systems should move authorization and database operations
// to trusted server-side routes/functions instead of directly calling
// Appwrite from browser clients.

export async function createApp(userId, appData) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      ID.unique(),
      {
        ...appData,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      }
    );
  } catch (error) {
    console.error('Error creating app:', error);
    throw error;
  }
}

export async function getUserApps(userId) {
  try {
    const apps = await databases.listDocuments(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('updatedAt'),
        Query.limit(100)
      ]
    );

    return apps.documents;
  } catch (error) {
    console.error('Error fetching user apps:', error);
    throw error;
  }
}

export async function getApp(appId) {
  try {
    return await databases.getDocument(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      appId
    );
  } catch (error) {
    console.error('Error fetching app:', error);
    throw error;
  }
}

export async function updateApp(appId, appData) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      appId,
      {
        ...appData,
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating app:', error);
    throw error;
  }
}

export async function deleteApp(appId) {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      appId
    );
  } catch (error) {
    console.error('Error deleting app:', error);
    throw error;
  }
}

export async function createComponent(userId, componentData) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COMPONENTS_COLLECTION_ID,
      ID.unique(),
      {
        ...componentData,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error creating component:', error);
    throw error;
  }
}

export async function getComponents(category = null) {
  try {
    const queries = [Query.limit(100)];

    if (category) {
      queries.push(Query.equal('category', category));
    }

    const components = await databases.listDocuments(
      DATABASE_ID,
      COMPONENTS_COLLECTION_ID,
      queries
    );

    return components.documents;
  } catch (error) {
    console.error('Error fetching components:', error);
    throw error;
  }
}

export async function createTemplate(userId, templateData) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      TEMPLATES_COLLECTION_ID,
      ID.unique(),
      {
        ...templateData,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
}

export async function getTemplates(category = null) {
  try {
    const queries = [Query.limit(100)];

    if (category) {
      queries.push(Query.equal('category', category));
    }

    const templates = await databases.listDocuments(
      DATABASE_ID,
      TEMPLATES_COLLECTION_ID,
      queries
    );

    return templates.documents;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
}
