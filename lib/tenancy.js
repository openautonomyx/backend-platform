import { databases } from '@/app/appwrite';
import { ID, Query } from 'appwrite';

const TENANCY_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_TENANCY_DATABASE_ID || '<TENANCY_DATABASE_ID>';
const TENANTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TENANTS_COLLECTION_ID || '<TENANTS_COLLECTION_ID>';
const TEAMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TEAMS_COLLECTION_ID || '<TEAMS_COLLECTION_ID>';
const INVITATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_INVITATIONS_COLLECTION_ID || '<INVITATIONS_COLLECTION_ID>';

// Tenancy access patterns now use Appwrite queries instead of broad client-side filtering.
// Production tenant authorization must still be enforced from trusted server routes/functions.

async function initializeTenancyDatabase() {
  console.warn('initializeTenancyDatabase is a development helper. Run schema setup from trusted migration scripts in production.');
}

async function createTenant(tenantData) {
  try {
    const now = new Date().toISOString();
    return await databases.createDocument(
      TENANCY_DATABASE_ID,
      TENANTS_COLLECTION_ID,
      ID.unique(),
      {
        ...tenantData,
        status: tenantData.status || 'active',
        createdAt: tenantData.createdAt || now,
        updatedAt: now
      }
    );
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
}

async function getTenant(tenantId) {
  try {
    return await databases.getDocument(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, tenantId);
  } catch (error) {
    console.error('Error fetching tenant:', error);
    throw error;
  }
}

async function getUserTenants(userId) {
  try {
    const tenants = await databases.listDocuments(TENANCY_DATABASE_ID, TENANTS_COLLECTION_ID, [
      Query.equal('ownerId', userId),
      Query.equal('status', 'active'),
      Query.orderDesc('updatedAt'),
      Query.limit(100)
    ]);

    return tenants.documents;
  } catch (error) {
    console.error('Error fetching user tenants:', error);
    throw error;
  }
}

async function updateTenant(tenantId, tenantData) {
  try {
    return await databases.updateDocument(
      TENANCY_DATABASE_ID,
      TENANTS_COLLECTION_ID,
      tenantId,
      {
        ...tenantData,
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
}

async function createTeam(teamData) {
  try {
    const now = new Date().toISOString();
    return await databases.createDocument(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID,
      ID.unique(),
      {
        ...teamData,
        members: teamData.members || '[]',
        createdAt: teamData.createdAt || now,
        updatedAt: now
      }
    );
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
}

async function getTeam(teamId) {
  try {
    return await databases.getDocument(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, teamId);
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
}

async function getTenantTeams(tenantId) {
  try {
    const teams = await databases.listDocuments(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, [
      Query.equal('tenantId', tenantId),
      Query.orderDesc('updatedAt'),
      Query.limit(100)
    ]);

    return teams.documents;
  } catch (error) {
    console.error('Error fetching tenant teams:', error);
    throw error;
  }
}

async function addTeamMember(teamId, userId, role) {
  try {
    const team = await databases.getDocument(TENANCY_DATABASE_ID, TEAMS_COLLECTION_ID, teamId);
    const members = JSON.parse(team.members || '[]');
    const alreadyMember = members.some(member => member.userId === userId);

    if (!alreadyMember) {
      members.push({ userId, role });
    }

    return await databases.updateDocument(
      TENANCY_DATABASE_ID,
      TEAMS_COLLECTION_ID,
      teamId,
      {
        members: JSON.stringify(members),
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
}

async function createInvitation(invitationData) {
  try {
    const now = new Date().toISOString();
    return await databases.createDocument(
      TENANCY_DATABASE_ID,
      INVITATIONS_COLLECTION_ID,
      ID.unique(),
      {
        ...invitationData,
        status: invitationData.status || 'pending',
        createdAt: invitationData.createdAt || now
      }
    );
  } catch (error) {
    console.error('Error creating invitation:', error);
    throw error;
  }
}

async function getInvitation(invitationId) {
  try {
    return await databases.getDocument(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, invitationId);
  } catch (error) {
    console.error('Error fetching invitation:', error);
    throw error;
  }
}

async function getPendingInvitationByToken(token) {
  try {
    const invitations = await databases.listDocuments(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, [
      Query.equal('token', token),
      Query.equal('status', 'pending'),
      Query.limit(1)
    ]);

    return invitations.documents[0] || null;
  } catch (error) {
    console.error('Error fetching invitation by token:', error);
    throw error;
  }
}

async function acceptInvitation(invitationId, acceptingUserId) {
  try {
    const invitation = await databases.getDocument(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, invitationId);

    if (invitation.status !== 'pending') {
      throw new Error('Invitation is not pending');
    }

    if (invitation.expiresAt && new Date(invitation.expiresAt) <= new Date()) {
      await databases.updateDocument(TENANCY_DATABASE_ID, INVITATIONS_COLLECTION_ID, invitationId, { status: 'expired' });
      throw new Error('Invitation has expired');
    }

    if (invitation.teamId) {
      await addTeamMember(invitation.teamId, acceptingUserId || invitation.email, invitation.role);
    }

    return await databases.updateDocument(
      TENANCY_DATABASE_ID,
      INVITATIONS_COLLECTION_ID,
      invitationId,
      { status: 'accepted' }
    );
  } catch (error) {
    console.error('Error accepting invitation:', error);
    throw error;
  }
}

async function getTenantResources(tenantId) {
  return {
    tenantId,
    apps: [],
    databases: [],
    storage: [],
    functions: []
  };
}

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
  getPendingInvitationByToken,
  acceptInvitation,
  getTenantResources
};
