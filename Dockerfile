# Dockerfile for AI-Native Enterprise App Builder

# Use official Node.js 16 image as base
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:16-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --omit=dev

# Expose port
EXPOSE 3000

# Environment variables
# These will be set at runtime or in docker-compose.yml
# NEXT_PUBLIC_APPWRITE_ENDPOINT
# NEXT_PUBLIC_APPWRITE_PROJECT_ID
# etc.

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]