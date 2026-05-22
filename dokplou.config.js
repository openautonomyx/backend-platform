/**
 * Dokplou Configuration for AI-Native Enterprise App Builder
 * 
 * This file configures the deployment settings for Dokplou
 */

module.exports = {
  // Basic project information
  name: 'AI-Native Enterprise App Builder',
  version: '1.0.0',
  description: 'Comprehensive platform for building enterprise applications with AI assistance',

  // Build configuration
  build: {
    // Build command
    command: 'npm run build',
    
    // Output directory
    output: './.next',
    
    // Node.js version
    nodeVersion: '16',
    
    // Environment variables required for build
    buildEnv: {
      NODE_ENV: 'production'
    }
  },

  // Runtime configuration
  runtime: {
    // Node.js version for runtime
    nodeVersion: '16',
    
    // Memory allocation
    memory: '1024MB',
    
    // Environment variables (these will be set in Dokplou dashboard)
    // They are listed here for documentation purposes
    requiredEnv: [
      'NEXT_PUBLIC_APPWRITE_ENDPOINT',
      'NEXT_PUBLIC_APPWRITE_PROJECT_ID',
      'NEXT_PUBLIC_APPWRITE_DATABASE_ID',
      'NEXT_PUBLIC_APPWRITE_APPS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_COMPONENTS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_TEMPLATES_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_GOVERNANCE_DATABASE_ID',
      'NEXT_PUBLIC_APPWRITE_ROLES_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_POLICIES_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_COMPLIANCE_RULES_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_AI_DATABASE_ID',
      'NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_AI_MODELS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_GENERATIONS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_TENANCY_DATABASE_ID',
      'NEXT_PUBLIC_APPWRITE_TENANTS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_TEAMS_COLLECTION_ID',
      'NEXT_PUBLIC_APPWRITE_INVITATIONS_COLLECTION_ID'
    ],
    
    // Optional environment variables
    optionalEnv: [
      'NODE_OPTIONS'
    ]
  },

  // Route configuration
  routes: [
    {
      // Main route - all paths go to index.html for Next.js routing
      src: '/(.*)',
      dest: '/',
      status: 200
    },
    {
      // API routes
      src: '/api/(.*)',
      dest: '/api/$1',
      status: 200
    },
    {
      // Static assets
      src: '/_next/(.*)',
      dest: '/_next/$1',
      status: 200
    }
  ],

  // Cache configuration
  cache: {
    // Static assets caching
    '/_next/static/(.*)': {
      maxAge: '365d',
      immutable: true
    },
    // API responses caching
    '/api/(.*)': {
      maxAge: '1h',
      staleWhileRevalidate: '24h'
    }
  },

  // Security headers
  headers: {
    // Content Security Policy
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:",
    // X-Frame-Options
    'X-Frame-Options': 'SAMEORIGIN',
    // X-Content-Type-Options
    'X-Content-Type-Options': 'nosniff',
    // X-XSS-Protection
    'X-XSS-Protection': '1; mode=block',
    // Referrer-Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Permissions-Policy
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  },

  // Redirects
  redirects: [
    {
      source: '/docs',
      destination: 'https://github.com/openautonomyx/platform/blob/main/README.md',
      statusCode: 301
    },
    {
      source: '/support',
      destination: 'https://github.com/openautonomyx/platform/issues',
      statusCode: 301
    }
  ],

  // Advanced configuration
  advanced: {
    // Auto-deploy on GitHub pushes
    autoDeploy: {
      branch: 'main',
      enabled: true
    },
    
    // Build cache
    buildCache: {
      enabled: true,
      maxSize: '2GB'
    },
    
    // Log retention
    logs: {
      retentionDays: 30
    },
    
    // Monitoring
    monitoring: {
      enabled: true,
      alerts: {
        errorRate: 0.1, // Alert if error rate exceeds 10%
        responseTime: 2000 // Alert if response time exceeds 2s
      }
    }
  },

  // Deployment phases
  phases: {
    preDeploy: {
      commands: [
        'echo "Starting deployment..."'
      ]
    },
    postDeploy: {
      commands: [
        'echo "Deployment completed successfully!"'
      ]
    }
  },

  // Notifications
  notifications: {
    // Email notifications
    email: {
      onSuccess: true,
      onFailure: true,
      recipients: ['admin@example.com']
    },
    
    // Slack notifications (optional)
    slack: {
      enabled: false, // Set to true and configure webhook to enable
      webhook: '',
      channel: '#deployments'
    }
  },

  // Backups
  backups: {
    enabled: true,
    schedule: '0 2 * * *', // Daily at 2 AM
    retention: 7 // Keep 7 days of backups
  },

  // Scaling configuration
  scaling: {
    minInstances: 1,
    maxInstances: 5,
    scaleUpThreshold: 0.7, // Scale up at 70% CPU
    scaleDownThreshold: 0.3 // Scale down at 30% CPU
  }
};