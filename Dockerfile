FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME ["/.env"]

# Use environment variables from the mounted file
ENV MONGO_URI FROM_ENV
ENV PORT FROM_ENV

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]