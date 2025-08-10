# Stage 1: Install dependencies
FROM node:18-slim AS builder

WORKDIR /app

# Install dependencies (cached unless package.json changes)
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . ./

# Stage 2: Production runtime
FROM node:18-slim

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app ./

EXPOSE 3000
CMD ["node", "app.js"]
