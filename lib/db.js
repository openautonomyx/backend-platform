import { databases } from '../app/appwrite';
import { ID } from 'appwrite';

// Database configuration
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '<DATABASE_ID>';
const APPS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPS_COLLECTION_ID || '<APPS_COLLECTION_ID>';
const COMPONENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPONENTS_COLLECTION_ID || '<COMPONENTS_COLLECTION_ID>';
const TEMPLATES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TEMPLATES_COLLECTION_ID || '<TEMPLATES_COLLECTION_ID>';

// Initialize database if not already done
export async function initializeDatabase() {
  try {
    // Check if database exists
    try {
      await databases.get(DATABASE_ID);
    } catch (error) {
      // Create database if it doesn't exist
      await databases.create(
        ID.unique(),
        'App Builder Database',
        DATABASE_ID
      );
      console.log('Database created:', DATABASE_ID);
    }

    // Check if apps collection exists
    try {
      await databases.getDocument(DATABASE_ID, APPS_COLLECTION_ID);
    } catch (error) {
      // Create apps collection
      await databases.createCollection(
        DATABASE_ID,
        ID.unique(),
        'Apps',
        APPS_COLLECTION_ID
      );
      
      // Add attributes to apps collection
      await databases.createStringAttribute(DATABASE_ID, APPS_COLLECTION_ID, 'name', 255, true);
      await databases.createStringAttribute(DATABASE_ID, APPS_COLLECTION_ID, 'description', 1000, false);
      await databases.createStringAttribute(DATABASE_ID, APPS_COLLECTION_ID, 'userId', 255, true);
      await databases.createDatetimeAttribute(DATABASE_ID, APPS_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(DATABASE_ID, APPS_COLLECTION_ID, 'updatedAt', true);
      await databases.createStringAttribute(DATABASE_ID, APPS_COLLECTION_ID, 'status', 50, false);
      
      console.log('Apps collection created:', APPS_COLLECTION_ID);
    }

    // Check if components collection exists
    try {
      await databases.getDocument(DATABASE_ID, COMPONENTS_COLLECTION_ID);
    } catch (error) {
      // Create components collection
      await databases.createCollection(
        DATABASE_ID,
        ID.unique(),
        'Components',
        COMPONENTS_COLLECTION_ID
      );
      
      // Add attributes to components collection
      await databases.createStringAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'name', 255, true);
      await databases.createStringAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'description', 1000, false);
      await databases.createStringAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'category', 100, false);
      await databases.createStringAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'code', 5000, true); // Store component code
      await databases.createStringAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'userId', 255, true);
      await databases.createDatetimeAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(DATABASE_ID, COMPONENTS_COLLECTION_ID, 'updatedAt', true);
      
      console.log('Components collection created:', COMPONENTS_COLLECTION_ID);
    }

    // Check if templates collection exists
    try {
      await databases.getDocument(DATABASE_ID, TEMPLATES_COLLECTION_ID);
    } catch (error) {
      // Create templates collection
      await databases.createCollection(
        DATABASE_ID,
        ID.unique(),
        'Templates',
        TEMPLATES_COLLECTION_ID
      );
      
      // Add attributes to templates collection
      await databases.createStringAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'name', 255, true);
      await databases.createStringAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'description', 1000, false);
      await databases.createStringAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'category', 100, false);
      await databases.createStringAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'previewImage', 255, false);
      await databases.createStringAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'userId', 255, true);
      await databases.createDatetimeAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(DATABASE_ID, TEMPLATES_COLLECTION_ID, 'updatedAt', true);
      
      console.log('Templates collection created:', TEMPLATES_COLLECTION_ID);
    }

    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// App functions
export async function createApp(userId, appData) {
  try {
    const app = await databases.createDocument(
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
    return app;
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
        // This is a simplified query - in production you'd use proper querying
        // For now we'll fetch all and filter client-side
      ]
    );
    
    // Filter apps by userId (since we can't do server-side filtering easily without proper indexing)
    return apps.documents.filter(app => app.userId === userId);
  } catch (error) {
    console.error('Error fetching user apps:', error);
    throw error;
  }
}

export async function getApp(appId) {
  try {
    const app = await databases.getDocument(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      appId
    );
    return app;
  } catch (error) {
    console.error('Error fetching app:', error);
    throw error;
  }
}

export async function updateApp(appId, appData) {
  try {
    const app = await databases.updateDocument(
      DATABASE_ID,
      APPS_COLLECTION_ID,
      appId,
      {
        ...appData,
        updatedAt: new Date().toISOString()
      }
    );
    return app;
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

// Component functions
export async function createComponent(userId, componentData) {
  try {
    const component = await databases.createDocument(
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
    return component;
  } catch (error) {
    console.error('Error creating component:', error);
    throw error;
  }
}

export async function getComponents(category = null) {
  try {
    const components = await databases.listDocuments(
      DATABASE_ID,
      COMPONENTS_COLLECTION_ID
    );
    
    if (category) {
      return components.documents.filter(comp => comp.category === category);
    }
    
    return components.documents;
  } catch (error) {
    console.error('Error fetching components:', error);
    throw error;
  }
}

// Template functions
export async function createTemplate(userId, templateData) {
  try {
    const template = await databases.createDocument(
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
    return template;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
}

export async function getTemplates(category = null) {
  try {
    const templates = await databases.listDocuments(
      DATABASE_ID,
      TEMPLATES_COLLECTION_ID
    );
    
    if (category) {
      return templates.documents.filter(temp => temp.category === category);
    }
    
    return templates.documents;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
}