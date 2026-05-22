import { databases } from '@/app/appwrite';
import { ID, Query } from 'appwrite';

const GOVERNANCE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_GOVERNANCE_DATABASE_ID || '<GOVERNANCE_DATABASE_ID>';
const ROLES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROLES_COLLECTION_ID || '<ROLES_COLLECTION_ID>';
const POLICIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_POLICIES_COLLECTION_ID || '<POLICIES_COLLECTION_ID>';
const AUDIT_LOGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID || '<AUDIT_LOGS_COLLECTION_ID>';
const COMPLIANCE_RULES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPLIANCE_RULES_COLLECTION_ID || '<COMPLIANCE_RULES_COLLECTION_ID>';

// Governance reads now use Appwrite queries instead of broad client-side filtering.
// Production authorization must still be enforced from trusted server routes/functions.

async function initializeGovernanceDatabase() {
  console.warn('initializeGovernanceDatabase is a development helper. Run schema setup from trusted migration scripts in production.');
}

async function createRole(roleData) {
  try {
    return await databases.createDocument(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, ID.unique(), roleData);
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

async function getRoles() {
  try {
    const roles = await databases.listDocuments(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, [
      Query.orderAsc('name'),
      Query.limit(100)
    ]);
    return roles.documents;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}

async function createPolicy(policyData) {
  try {
    return await databases.createDocument(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, ID.unique(), policyData);
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
}

async function getPolicies(type = null) {
  try {
    const queries = [Query.orderAsc('name'), Query.limit(100)];
    if (type) queries.push(Query.equal('type', type));

    const policies = await databases.listDocuments(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, queries);
    return policies.documents;
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw error;
  }
}

async function logAudit(userId, action, entityType, entityId, details = '', ipAddress = '') {
  try {
    return await databases.createDocument(
      GOVERNANCE_DATABASE_ID,
      AUDIT_LOGS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        action,
        entityType,
        entityId,
        details,
        ipAddress,
        timestamp: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error logging audit:', error);
    throw error;
  }
}

async function getAuditLogs(filter = {}) {
  try {
    const queries = [Query.orderDesc('timestamp'), Query.limit(filter.limit || 100)];

    if (filter.userId) queries.push(Query.equal('userId', filter.userId));
    if (filter.action) queries.push(Query.equal('action', filter.action));
    if (filter.entityType) queries.push(Query.equal('entityType', filter.entityType));
    if (filter.entityId) queries.push(Query.equal('entityId', filter.entityId));

    const logs = await databases.listDocuments(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, queries);
    return logs.documents;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
}

async function createComplianceRule(ruleData) {
  try {
    return await databases.createDocument(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, ID.unique(), ruleData);
  } catch (error) {
    console.error('Error creating compliance rule:', error);
    throw error;
  }
}

async function getComplianceRules(standard = null) {
  try {
    const queries = [Query.orderAsc('name'), Query.limit(100)];
    if (standard) queries.push(Query.equal('standard', standard));

    const rules = await databases.listDocuments(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, queries);
    return rules.documents;
  } catch (error) {
    console.error('Error fetching compliance rules:', error);
    throw error;
  }
}

async function checkPermission(userRole, resource, action) {
  try {
    if (!userRole || !resource || !action) return false;

    const roles = await databases.listDocuments(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, [
      Query.equal('name', userRole),
      Query.limit(1)
    ]);

    const role = roles.documents[0];
    if (!role) return false;

    const permissions = JSON.parse(role.permissions || '{}');
    return permissions[resource]?.includes(action) || false;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

export {
  initializeGovernanceDatabase,
  createRole,
  getRoles,
  createPolicy,
  getPolicies,
  logAudit,
  getAuditLogs,
  createComplianceRule,
  getComplianceRules,
  checkPermission
};
