FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

RUN npm run build

CMD ["bash", "-c", "make db-migrate && npm start"]
