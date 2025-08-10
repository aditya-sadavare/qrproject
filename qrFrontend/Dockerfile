# Stage 1: Build the frontend
FROM node:18-slim AS builder

WORKDIR /app

# Install all deps (so vite is available)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files only (no node_modules)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
