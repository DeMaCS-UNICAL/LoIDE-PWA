# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app

# Copy only what's needed for production
COPY --from=builder /app/build ./build
COPY --from=builder /app/config ./config
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/docker-entrypoint.sh ./

# Install only production dependencies
RUN npm ci --omit=dev

# Get version from package.json and set as label
ARG APP_VERSION
LABEL org.opencontainers.image.version="${APP_VERSION}"
LABEL org.opencontainers.image.title="LoIDE-PWA"
LABEL org.opencontainers.image.description="Progressive Web App IDE for Logic Programming"
LABEL org.opencontainers.image.source="https://github.com/DeMaCS-UNICAL/LoIDE-PWA"

# Make entrypoint script executable
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"]
