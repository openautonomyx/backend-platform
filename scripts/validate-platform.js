#!/usr/bin/env node

/**
 * Platform Validation Script
 * 
 * This script validates that all components of the AI-native enterprise
 * application development platform are properly integrated and configured.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Platform Validation...\n');

// Check required files and directories
const requiredFiles = [
  '.env.local',
  'app/appwrite.js',
  'app/layout.js',
  'app/page.js',
  'app/dashboard.js',
  'app/_components/AppForm.js',
  'app/_components/ComponentLibrary.js',
  'app/_components/VisualBuilder.js',
  'app/_components/GovernanceDashboard.js',
  'lib/db.js',
  'lib/governance.js',
  'lib/ai.js',
  'lib/tenancy.js'
];

const requiredDirectories = [
  'app',
  'app/_components',
  'lib'
];

let validationPassed = true;

// Validate files
console.log('📁 Checking required files...');
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing file: ${file}`);
    validationPassed = false;
  } else {
    console.log(`✅ Found: ${file}`);
  }
}

// Validate directories
console.log('\n📂 Checking required directories...');
for (const dir of requiredDirectories) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Missing directory: ${dir}`);
    validationPassed = false;
  } else {
    console.log(`✅ Found: ${dir}/`);
  }
}

// Check environment variables
console.log('\n🔧 Checking environment configuration...');
const envPath = '.env.local';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredEnvVars = [
    'NEXT_PUBLIC_APPWRITE_ENDPOINT',
    'NEXT_PUBLIC_APPWRITE_PROJECT_ID',
    'NEXT_PUBLIC_APPWRITE_DATABASE_ID',
    'NEXT_PUBLIC_APPWRITE_APPS_COLLECTION_ID',
    'NEXT_PUBLIC_APPWRITE_GOVERNANCE_DATABASE_ID',
    'NEXT_PUBLIC_APPWRITE_AI_DATABASE_ID',
    'NEXT_PUBLIC_APPWRITE_TENANCY_DATABASE_ID'
  ];
  
  for (const varName of requiredEnvVars) {
    if (envContent.includes(varName)) {
      console.log(`✅ Configured: ${varName}`);
    } else {
      console.error(`❌ Missing env var: ${varName}`);
      validationPassed = false;
    }
  }
} else {
  console.error('❌ Missing .env.local file');
  validationPassed = false;
}

// Check appwrite.js configuration
console.log('\n🔗 Checking Appwrite configuration...');
const appwritePath = 'app/appwrite.js';
if (fs.existsSync(appwritePath)) {
  const appwriteContent = fs.readFileSync(appwritePath, 'utf8');
  
    // Check for required exports
  const requiredExports = ['client', 'account', 'databases', 'ID'];
  for (const exportName of requiredExports) {
    if (exportName === 'ID') {
      if (appwriteContent.includes('export { ID }')) {
        console.log(`✅ Exported: ${exportName}`);
      } else {
        console.error(`❌ Missing export: ${exportName}`);
        validationPassed = false;
      }
    } else {
      if (appwriteContent.includes(`export const ${exportName}`)) {
        console.log(`✅ Exported: ${exportName}`);
      } else {
        console.error(`❌ Missing export: ${exportName}`);
        validationPassed = false;
      }
    }
  }
} else {
  console.error('❌ Missing app/appwrite.js');
  validationPassed = false;
}

// Check library modules
console.log('\n📚 Checking library modules...');
const libModules = [
  { file: 'lib/db.js', functions: ['initializeDatabase', 'createApp', 'getUserApps'] },
  { file: 'lib/governance.js', functions: ['initializeGovernanceDatabase', 'createRole', 'logAudit'] },
  { file: 'lib/ai.js', functions: ['initializeAIDatabase', 'generateCode', 'generateUI'] },
  { file: 'lib/tenancy.js', functions: ['initializeTenancyDatabase', 'createTenant', 'createTeam'] }
];

for (const module of libModules) {
  if (fs.existsSync(module.file)) {
    const content = fs.readFileSync(module.file, 'utf8');
    for (const func of module.functions) {
      if (content.includes(`function ${func}`) || content.includes(`async function ${func}`)) {
        console.log(`✅ ${module.file}: ${func}`);
      } else {
        console.error(`❌ ${module.file}: Missing function ${func}`);
        validationPassed = false;
      }
    }
  } else {
    console.error(`❌ Missing module: ${module.file}`);
    validationPassed = false;
  }
}

// Check React components
console.log('\n🎨 Checking React components...');
const components = [
  'AppForm',
  'ComponentLibrary',
  'VisualBuilder',
  'GovernanceDashboard'
];

for (const component of components) {
  const filePath = `app/_components/${component}.js`;
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(`export default function ${component}`)) {
      console.log(`✅ Component: ${component}`);
    } else {
      console.error(`❌ Component ${component} missing export`);
      validationPassed = false;
    }
  } else {
    console.error(`❌ Missing component: ${component}`);
    validationPassed = false;
  }
}

// Check main pages
console.log('\n📄 Checking main pages...');
const pages = ['page.js', 'dashboard.js'];
for (const page of pages) {
  const filePath = `app/${page}`;
  if (fs.existsSync(filePath)) {
    console.log(`✅ Page: ${page}`);
  } else {
    console.error(`❌ Missing page: ${page}`);
    validationPassed = false;
  }
}

// Final validation result
console.log('\n' + '='.repeat(50));
if (validationPassed) {
  console.log('🎉 Platform Validation PASSED!');
  console.log('\n✅ All required components are present and properly configured.');
  console.log('✅ The platform is ready for testing and further development.');
  console.log('\nNext steps:');
  console.log('1. Configure .env.local with actual Appwrite IDs');
  console.log('2. Run npm install to install dependencies');
  console.log('3. Run npm run dev to start the development server');
  console.log('4. Test authentication and platform features');
} else {
  console.log('❌ Platform Validation FAILED!');
  console.log('\nPlease fix the issues above and run validation again.');
}
console.log('='.repeat(50) + '\n');

process.exit(validationPassed ? 0 : 1);