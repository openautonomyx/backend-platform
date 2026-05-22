import { useState, useEffect } from 'react';
import { getRoles, getPolicies, getAuditLogs, getComplianceRules } from '@/lib/governance';

export default function GovernanceDashboard({ userId }) {
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [complianceRules, setComplianceRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('roles');

  useEffect(() => {
    async function loadGovernanceData() {
      try {
        const [loadedRoles, loadedPolicies, loadedAuditLogs, loadedComplianceRules] = await Promise.all([
          getRoles(),
          getPolicies(),
          getAuditLogs(),
          getComplianceRules()
        ]);
        
        setRoles(loadedRoles);
        setPolicies(loadedPolicies);
        setAuditLogs(loadedAuditLogs);
        setComplianceRules(loadedComplianceRules);
      } catch (err) {
        setError(err.message || 'Failed to load governance data');
      } finally {
        setLoading(false);
      }
    }

    loadGovernanceData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2">Loading governance data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Enterprise Governance Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['roles', 'policies', 'audit', 'compliance'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-1 py-2 text-sm font-medium border-b-2 
                    ${activeTab === tab 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {activeTab === 'roles' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Roles & Permissions</h2>
                <div className="space-y-4">
                  {roles.length === 0 ? (
                    <p className="text-gray-500">No roles defined. Create roles to manage permissions.</p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {roles.map(role => (
                        <div key={role.$id} className="border rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{role.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                          <div className="text-xs">
                            <h4 className="font-medium text-gray-800 mb-1">Permissions:</h4>
                            <pre className="bg-gray-50 p-2 rounded overflow-x-auto text-xs">
                              {JSON.stringify(JSON.parse(role.permissions || '{}'), null, 2)}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Policies</h2>
                <div className="space-y-4">
                  {policies.length === 0 ? (
                    <p className="text-gray-500">No policies defined. Create policies to enforce security rules.</p>
                  ) : (
                    <div className="space-y-4">
                      {policies.map(policy => (
                        <div key={policy.$id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{policy.name}</h3>
                              <p className="text-gray-600 text-sm mb-2">{policy.description}</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${policy.type === 'security' ? 'bg-red-100 text-red-800' : 
                                 policy.type === 'compliance' ? 'bg-blue-100 text-blue-800' : 
                                 'bg-green-100 text-green-800'}"
                              >
                                {policy.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Logs</h2>
                <div className="overflow-x-auto">
                  {auditLogs.length === 0 ? (
                    <p className="text-gray-500">No audit logs available.</p>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {auditLogs.map(log => (
                          <tr key={log.$id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.userId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {log.entityType}:{log.entityId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Rules</h2>
                <div className="space-y-4">
                  {complianceRules.length === 0 ? (
                    <p className="text-gray-500">No compliance rules defined. Add rules to ensure regulatory compliance.</p>
                  ) : (
                    <div className="space-y-4">
                      {complianceRules.map(rule => (
                        <div key={rule.$id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{rule.name}</h3>
                              <p className="text-gray-600 text-sm mb-2">{rule.description}</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {rule.standard}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}