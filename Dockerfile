FROM node:20-alpine
WORKDIR /app
COPY . .

RUN npm install

# Make entrypoint script executable
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"]
