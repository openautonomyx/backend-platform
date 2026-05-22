import { databases } from '@/app/appwrite';
import { ID } from 'appwrite';

// Governance configuration
const GOVERNANCE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_GOVERNANCE_DATABASE_ID || '<GOVERNANCE_DATABASE_ID>';
const ROLES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ROLES_COLLECTION_ID || '<ROLES_COLLECTION_ID>';
const POLICIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_POLICIES_COLLECTION_ID || '<POLICIES_COLLECTION_ID>';
const AUDIT_LOGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID || '<AUDIT_LOGS_COLLECTION_ID>';
const COMPLIANCE_RULES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPLIANCE_RULES_COLLECTION_ID || '<COMPLIANCE_RULES_COLLECTION_ID>';

// Initialize governance database
async function initializeGovernanceDatabase() {
  try {
    // Check/create governance database
    try {
      await databases.get(GOVERNANCE_DATABASE_ID);
    } catch (error) {
      await databases.create(
        ID.unique(),
        'Enterprise Governance Database',
        GOVERNANCE_DATABASE_ID
      );
    }

    // Create roles collection
    try {
      await databases.getDocument(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        GOVERNANCE_DATABASE_ID,
        ID.unique(),
        'Roles',
        ROLES_COLLECTION_ID
      );
      
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, 'name', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, 'description', 500, false);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, 'permissions', 5000, true);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, ROLES_COLLECTION_ID, 'updatedAt', true);
    }

    // Create policies collection
    try {
      await databases.getDocument(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        GOVERNANCE_DATABASE_ID,
        ID.unique(),
        'Policies',
        POLICIES_COLLECTION_ID
      );
      
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, 'name', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, 'description', 500, false);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, 'type', 50, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, 'rules', 10000, true);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, POLICIES_COLLECTION_ID, 'updatedAt', true);
    }

    // Create audit logs collection
    try {
      await databases.getDocument(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        GOVERNANCE_DATABASE_ID,
        ID.unique(),
        'AuditLogs',
        AUDIT_LOGS_COLLECTION_ID
      );
      
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'userId', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'action', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'entityType', 50, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'entityId', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'details', 5000, false);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'ipAddress', 50, false);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, AUDIT_LOGS_COLLECTION_ID, 'timestamp', true);
    }

    // Create compliance rules collection
    try {
      await databases.getDocument(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID);
    } catch (error) {
      await databases.createCollection(
        GOVERNANCE_DATABASE_ID,
        ID.unique(),
        'ComplianceRules',
        COMPLIANCE_RULES_COLLECTION_ID
      );
      
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, 'name', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, 'description', 500, false);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, 'standard', 100, true);
      await databases.createStringAttribute(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, 'criteria', 5000, true);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, 'createdAt', true);
      await databases.createDatetimeAttribute(GOVERNANCE_DATABASE_ID, COMPLIANCE_RULES_COLLECTION_ID, 'updatedAt', true);
    }

    // Create default roles
    const defaultRoles = [
      {
        name: 'Admin',
        description: 'Full access to all features and settings',
        permissions: JSON.stringify({
          apps: ['create', 'read', 'update', 'delete'],
          users: ['create', 'read', 'update', 'delete'],
          settings: ['read', 'update'],
          governance: ['read', 'update'],
          deployments: ['create', 'read', 'update', 'delete']
        })
      },
      {
        name: 'Developer',
        description: 'Access to build and manage applications',
        permissions: JSON.stringify({
          apps: ['create', 'read', 'update'],
          users: ['read'],
          settings: ['read'],
          deployments: ['create', 'read']
        })
      },
      {
        name: 'Viewer',
        description: 'Read-only access to view applications and data',
        permissions: JSON.stringify({
          apps: ['read'],
          users: ['read'],
          settings: ['read'],
          deployments: ['read']
        })
      }
    ];

    for (const role of defaultRoles) {
      try {
        await databases.createDocument(
          GOVERNANCE_DATABASE_ID,
          ROLES_COLLECTION_ID,
          ID.unique(),
          role
        );
      } catch (error) {
        // Role may already exist
        console.log(`Role ${role.name} may already exist`);
      }
    }

    console.log('Governance database initialized successfully');
  } catch (error) {
    console.error('Error initializing governance database:', error);
    throw error;
  }
}

// Role management
async function createRole(roleData) {
  try {
    const role = await databases.createDocument(
      GOVERNANCE_DATABASE_ID,
      ROLES_COLLECTION_ID,
      ID.unique(),
      roleData
    );
    return role;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

async function getRoles() {
  try {
    const roles = await databases.listDocuments(
      GOVERNANCE_DATABASE_ID,
      ROLES_COLLECTION_ID
    );
    return roles.documents;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}

// Policy management
async function createPolicy(policyData) {
  try {
    const policy = await databases.createDocument(
      GOVERNANCE_DATABASE_ID,
      POLICIES_COLLECTION_ID,
      ID.unique(),
      policyData
    );
    return policy;
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
}

async function getPolicies() {
  try {
    const policies = await databases.listDocuments(
      GOVERNANCE_DATABASE_ID,
      POLICIES_COLLECTION_ID
    );
    return policies.documents;
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw error;
  }
}

// Audit logging
async function logAudit(userId, action, entityType, entityId, details = '', ipAddress = '') {
  try {
    const auditLog = await databases.createDocument(
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
    return auditLog;
  } catch (error) {
    console.error('Error logging audit:', error);
    throw error;
  }
}

async function getAuditLogs(filter = {}) {
  try {
    const logs = await databases.listDocuments(
      GOVERNANCE_DATABASE_ID,
      AUDIT_LOGS_COLLECTION_ID
    );
    
    // Simple client-side filtering
    let filteredLogs = logs.documents;
    if (filter.userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === filter.userId);
    }
    if (filter.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filter.action);
    }
    if (filter.entityType) {
      filteredLogs = filteredLogs.filter(log => log.entityType === filter.entityType);
    }
    
    return filteredLogs;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
}

// Compliance management
async function createComplianceRule(ruleData) {
  try {
    const rule = await databases.createDocument(
      GOVERNANCE_DATABASE_ID,
      COMPLIANCE_RULES_COLLECTION_ID,
      ID.unique(),
      ruleData
    );
    return rule;
  } catch (error) {
    console.error('Error creating compliance rule:', error);
    throw error;
  }
}

async function getComplianceRules() {
  try {
    const rules = await databases.listDocuments(
      GOVERNANCE_DATABASE_ID,
      COMPLIANCE_RULES_COLLECTION_ID
    );
    return rules.documents;
  } catch (error) {
    console.error('Error fetching compliance rules:', error);
    throw error;
  }
}

// RBAC checking
async function checkPermission(userId, resource, action) {
  try {
    // Get user's role (in a real implementation, this would come from user data)
    // For demo purposes, we'll assume users have a role assigned
    const userRole = 'Developer'; // This should be fetched from user data
    
    // Get the role's permissions
    const roles = await getRoles();
    const role = roles.find(r => r.name === userRole);
    
    if (!role) {
      return false;
    }
    
    const permissions = JSON.parse(role.permissions || '{}');
    
    // Check if the user has the required permission
    return permissions[resource]?.includes(action) || false;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

// Export governance functions
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