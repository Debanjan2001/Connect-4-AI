FROM node:16-alpine

WORKDIR /app

COPY . .

# For the server
RUN npm install 

# For the client
RUN npm install --prefix client && npm run build --prefix client

EXPOSE 3001

CMD ["npm", "start"]