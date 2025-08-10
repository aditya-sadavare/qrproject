# Stage 1: Build the frontend
FROM node:18-slim AS builder

WORKDIR /app

# Install dependencies (cached unless package.json changes)
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY . ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
