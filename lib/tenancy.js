import { databases } from '@/app/appwrite';
import { ID } from 'appwrite';

// Tenancy Configuration
const TENANCY_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_TENANCY_DATABASE_ID || '<TENANCY_DATABASE_ID>';
const TENANTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TENANTS_COLLECTION_ID || '<TENANTS_COLLECTION_ID>';
const TEAMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TEAMS_COLLECTION_ID || '<TEAMS_COLLECTION_ID>';
const INVITATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_INVITATIONS_COLLECTION_ID || '<INVITATIONS_COLLECTION_ID>';

// Initialize tenancy database
async function initializeTenancyDatabase() {
  try {
    // Check/create tenancy database
    try {
      await databases.get(TENANCY_DATABASE_ID);
    } catch (error) {
      await databases.create(
        ID.unique(),
        'Enterprise Tenancy Database',
        TENANCY_DATABASE_ID
      );
    }

    // Create tenants collection
    try {
      await databases.getDocument(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        TENANCY_DATABASE_ID,
        ID.unique(),
        'Tenants',
        TENANTS_COLLECTION_ID
      );
      
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'name', 200, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'slug', 100, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'description', 1000, false);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'ownerId', 100, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'status', 50, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'settings', 5000, false);
      await databases.createDatetimeAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, 'updatedAt', true);
    }

    // Create teams collection
    try {
      await databases.getDocument(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        TENANCY_DATABASE_ID,
        ID.unique(),
        'Teams',
        TEAMS_COLLECTION_ID
      );
      
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, 'name', 200, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, 'tenantId', 100, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, 'description', 1000, false);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, 'members', 5000, false);
      await databases.createDatetimeAttribute(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, 'updatedAt', true);
    }

    // Create invitations collection
    try {
      await databases.getDocument(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        TENANCY_DATABASE_ID,
        ID.unique(),
        'Invitations',
        INVITATIONS_COLLECTION_ID
      );
      
      await databases.createStringAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'email', 200, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'tenantId', 100, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'teamId', 100, false);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'role', 100, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'status', 50, true);
      await databases.createStringAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'token', 100, true);
      await databases.createDatetimeAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, 'expiresAt', true);
    }

    console.log('Tenancy database initialized successfully');
  } catch (error) {
    console.error('Error initializing tenancy database:', error);
    throw error;
  }
}

// Tenant Management
async function createTenant(tenantData) {
  try {
    const tenant = await databases.createDocument(
      TENANCY_DATABASE_ID,
      TENANTS_COLLECTION_ID,
      ID.unique(),
      tenantData
    );
    return tenant;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
}

async function getTenant(tenantId) {
  try {
    const tenant = await databases.getDocument(
      TENANCY_DATABASE_ID,
      TENANTS_COLLECTION_ID,
      tenantId
    );
    return tenant;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }
}

async function getUserTenants(userId) {
  try {
    const tenants = await databases.listDocuments(
      TENANCY_DATABASE_ID,
      TENANTS_COLLECTION_ID
    );
    
    // Filter tenants where user is owner or member of a team
    return tenants.documents.filter(t => t.ownerId === userId);
  } catch (error) {
    console.error('Error fetching user tenants:', error);
    throw error;
  }
}

async function updateTenant(tenantId, tenantData) {
  try {
    const tenant = await databases.updateDocument(
      TENANCY_DATABASE_ID,
      TENANTS_COLLECTION_ID,
      tenantId,
      tenantData
    );
    return tenant;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
}

// Team Management
async function createTeam(teamData) {
  try {
    const team = await databases.createDocument(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID,
      ID.unique(),
      teamData
    );
    return team;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
}

async function getTeam(teamId) {
  try {
    const team = await databases.getDocument(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID,
      teamId
    );
    return team;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
}

async function getTenantTeams(tenantId) {
  try {
    const teams = await databases.listDocuments(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID
    );
    
    return teams.documents.filter(t => t.tenantId === tenantId);
  } catch (error) {
    console.error('Error fetching tenant teams:', error);
    throw error;
  }
}

async function addTeamMember(teamId, userId, role) {
  try {
    const team = await databases.getDocument(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID,
      teamId
    );
    
    const members = JSON.parse(team.members || '[]');
    members.push({ userId, role });
    
    const updatedTeam = await databases.updateDocument(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID,
      teamId,
      { members: JSON.stringify(members) }
    );
    
    return updatedTeam;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
}

// Invitation Management
async function createInvitation(invitationData) {
  try {
    const invitation = await databases.createDocument(
      TENANCY_DATABASE_ID,
      INVITATIONS_COLLECTION_ID,
      ID.unique(),
      invitationData
    );
    return invitation;
  } catch (error) {
    console.error('Error creating invitation:', error);
    throw error;
  }
}

async function getInvitation(invitationId) {
  try {
    const invitation = await databases.getDocument(
      TENANCY_DATABASE_ID,
      INVITATIONS_COLLECTION_ID,
      invitationId
    );
    return invitation;
  } catch (error) {
    console.error('Error fetching invitation:', error);
    throw error;
  }
}

async function acceptInvitation(invitationId) {
  try {
    const invitation = await databases.getDocument(
      TENANCY_DATABASE_ID,
      INVITATIONS_COLLECTION_ID,
      invitationId
    );
    
    if (invitation.status !== 'pending') {
      throw new Error('Invitation is not pending');
    }
    
    // Add user to team
    if (invitation.teamId) {
      await addTeamMember(invitation.teamId, invitation.email, invitation.role);
    }
    
    // Mark invitation as accepted
    const updatedInvitation = await databases.updateDocument(
      TENANCY_DATABASE_ID,
      INVITATIONS_COLLECTION_ID,
      invitationId,
      { status: 'accepted' }
    );
    
    return updatedInvitation;
  } catch (error) {
    console.error('Error accepting invitation:', error);
    throw error;
  }
}

// Resource Isolation
async function getTenantResources(tenantId) {
  try {
    // In a real implementation, this would query all resources
    // that belong to this tenant (apps, databases, etc.)
    // For now, we'll return a simple structure
    return {
      apps: [],
      databases: [],
      storage: [],
      functions: []
    };
  } catch (error) {
    console.error('Error fetching tenant resources:', error);
    throw error;
  }
}

// Export tenancy functions
export {
  initializeTenancyDatabase,
  createTenant,
  getTenant,
  getUserTenants,
  updateTenant,
  createTeam,
  getTeam,
  getTenantTeams,
  addTeamMember,
  createInvitation,
  getInvitation,
  acceptInvitation,
  getTenantResources
};