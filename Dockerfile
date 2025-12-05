FROM node:22-alpine
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

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
