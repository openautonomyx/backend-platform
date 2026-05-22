# AI-Native Enterprise App Builder - Setup Guide

This guide will walk you through setting up and configuring the AI-Native Enterprise Application Development Platform.

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** version 16 or higher
- **npm** or **yarn** package manager
- **Appwrite** instance (self-hosted or cloud)
- **Code Editor** (VS Code, WebStorm, etc.)
- **Terminal** access

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository to your local machine
git clone https://github.com/openautonomyx/platform.git

# Navigate to the project directory
cd platform
```

### 2. Install Dependencies

```bash
# Install all required dependencies
npm install

# Or if you prefer yarn
yarn install
```

This will install:
- Next.js framework
- Appwrite SDK
- All required dependencies

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Open the file in your editor
# Replace all placeholder values with your actual Appwrite configuration
```

#### Environment Variables Explained

**Appwrite Configuration:**
- `NEXT_PUBLIC_APPWRITE_ENDPOINT`: Your Appwrite server endpoint
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`: Your Appwrite project ID

**Database Configuration:**
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`: Main database ID
- `NEXT_PUBLIC_APPWRITE_APPS_COLLECTION_ID`: Apps collection ID
- `NEXT_PUBLIC_APPWRITE_COMPONENTS_COLLECTION_ID`: Components collection ID
- `NEXT_PUBLIC_APPWRITE_TEMPLATES_COLLECTION_ID`: Templates collection ID

**Governance Configuration:**
- `NEXT_PUBLIC_APPWRITE_GOVERNANCE_DATABASE_ID`: Governance database ID
- `NEXT_PUBLIC_APPWRITE_ROLES_COLLECTION_ID`: Roles collection ID
- `NEXT_PUBLIC_APPWRITE_POLICIES_COLLECTION_ID`: Policies collection ID
- `NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID`: Audit logs collection ID
- `NEXT_PUBLIC_APPWRITE_COMPLIANCE_RULES_COLLECTION_ID`: Compliance rules collection ID

**AI Configuration:**
- `NEXT_PUBLIC_APPWRITE_AI_DATABASE_ID`: AI database ID
- `NEXT_PUBLIC_APPWRITE_PROMPTS_COLLECTION_ID`: Prompts collection ID
- `NEXT_PUBLIC_APPWRITE_AI_MODELS_COLLECTION_ID`: AI models collection ID
- `NEXT_PUBLIC_APPWRITE_GENERATIONS_COLLECTION_ID`: Generations collection ID

**Tenancy Configuration:**
- `NEXT_PUBLIC_APPWRITE_TENANCY_DATABASE_ID`: Tenancy database ID
- `NEXT_PUBLIC_APPWRITE_TENANTS_COLLECTION_ID`: Tenants collection ID
- `NEXT_PUBLIC_APPWRITE_TEAMS_COLLECTION_ID`: Teams collection ID
- `NEXT_PUBLIC_APPWRITE_INVITATIONS_COLLECTION_ID`: Invitations collection ID

### 4. Set Up Appwrite

#### Create Appwrite Project

1. **Log in** to your Appwrite console
2. **Create a new project**
3. **Enable the following services**:
   - Authentication
   - Databases
   - Storage
   - Functions (optional)

#### Create Databases and Collections

You need to create the following databases and collections:

**Main Database:**
- **Apps Collection**: Store application metadata
- **Components Collection**: Store reusable UI components
- **Templates Collection**: Store app templates

**Governance Database:**
- **Roles Collection**: Store user roles and permissions
- **Policies Collection**: Store security policies
- **AuditLogs Collection**: Store audit trail records
- **ComplianceRules Collection**: Store compliance rules

**AI Database:**
- **Prompts Collection**: Store AI prompt templates
- **AIModels Collection**: Store AI model configurations
- **Generations Collection**: Store AI generation history

**Tenancy Database:**
- **Tenants Collection**: Store tenant information
- **Teams Collection**: Store team information
- **Invitations Collection**: Store invitation records

### 5. Configure CORS

Add your development domain to the Appwrite CORS settings:

1. Go to **Settings** > **API** in your Appwrite console
2. Add `http://localhost:3001` to the **CORS Origins** list
3. Save the settings

### 6. Start the Development Server

```bash
# Start the Next.js development server
npm run dev

# Or with yarn
yarn dev
```

The application will start and be available at:
👉 [http://localhost:3001](http://localhost:3001)

### 7. Test the Platform

#### Create Your First Account

1. Open your browser to `http://localhost:3001`
2. Fill in the registration form with your details
3. Click **Register** to create your account
4. You'll be automatically logged in

#### Explore the Dashboard

1. **Dashboard**: Overview of your applications and quick actions
2. **App Builder**: Visual drag-and-drop interface for building apps
3. **My Apps**: List of your created applications
4. **Governance**: Manage roles, policies, and compliance
5. **AI Studio**: Generate code and UI with AI
6. **Tenants**: Manage organizational structure
7. **Settings**: Account settings and preferences

#### Create Your First Application

1. Click **App Builder** in the sidebar
2. Drag components from the library to the canvas
3. Customize properties in the property editor
4. Click **Save Design** to save your app
5. Your app will appear in the **My Apps** section

## 🛠️ Troubleshooting

### Common Issues

**Issue: Appwrite connection failed**
- **Solution**: Check your `.env.local` file for correct Appwrite configuration
- **Solution**: Ensure your Appwrite instance is running and accessible
- **Solution**: Verify CORS settings in Appwrite console

**Issue: Database operations failed**
- **Solution**: Check that all databases and collections exist in Appwrite
- **Solution**: Verify collection IDs in `.env.local` match your Appwrite setup
- **Solution**: Check Appwrite service status

**Issue: Authentication failed**
- **Solution**: Ensure Auth service is enabled in Appwrite
- **Solution**: Check email/password authentication is configured
- **Solution**: Verify user credentials

**Issue: UI not loading properly**
- **Solution**: Clear browser cache and refresh
- **Solution**: Check browser console for errors
- **Solution**: Ensure all dependencies are installed (`npm install`)

### Debugging Tips

1. **Check browser console** for JavaScript errors
2. **Check network tab** for API request failures
3. **Check Appwrite logs** for server-side errors
4. **Enable debug mode** in Appwrite console
5. **Verify environment variables** are loaded correctly

## 🚀 Production Deployment

### Build for Production

```bash
# Create production build
npm run build

# Or with yarn
yarn build
```

### Run in Production

```bash
# Start production server
npm run start

# Or with yarn
yarn start
```

### Environment Configuration

For production, set up proper environment variables:

```bash
# Use a proper secrets manager
# Set NODE_ENV=production
# Configure proper logging
# Set up monitoring
```

### Docker Deployment (Optional)

```bash
# Build Docker image
docker build -t ai-enterprise-builder .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint.com/v1 \
  -e NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id \
  # ... other environment variables \
  ai-enterprise-builder
```

## 🔧 Maintenance

### Updating Dependencies

```bash
# Update all dependencies
npm update

# Or check for outdated packages
npm outdated
```

### Database Migrations

When adding new features that require database changes:

1. Create new collections in Appwrite console
2. Update `.env.local` with new collection IDs
3. Update library functions to use new collections
4. Test thoroughly before deploying

### Backups

Regularly backup your Appwrite data:

1. **Database backups**: Export collections regularly
2. **Storage backups**: Backup files and assets
3. **Configuration backups**: Save project settings

## 📚 Learning Resources

### Appwrite Documentation
- [Appwrite Docs](https://appwrite.io/docs)
- [Appwrite GitHub](https://github.com/appwrite/appwrite)
- [Appwrite Community](https://appwrite.io/discord)

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js Learn](https://nextjs.org/learn)

### AI Development Resources
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Hugging Face](https://huggingface.co/)
- [AI Research Papers](https://arxiv.org/)

## 🤝 Getting Help

For support and community resources:

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check the latest setup guides
- **Community Forum**: Ask questions and share knowledge
- **Email Support**: support@ai-enterprise-builder.com

## 📋 Checklist

- [ ] Clone repository
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Set up Appwrite project
- [ ] Create databases and collections
- [ ] Configure CORS settings
- [ ] Start development server
- [ ] Test authentication
- [ ] Explore dashboard features
- [ ] Create first application

## 🎉 Congratulations!

You've successfully set up the AI-Native Enterprise Application Development Platform! 🚀

Now you can:
- Build applications visually with the drag-and-drop builder
- Generate code and UI with AI assistance
- Manage enterprise governance and compliance
- Collaborate with teams in a multi-tenant environment
- Deploy applications quickly and securely

**Start building your next enterprise application in minutes!** 🚀