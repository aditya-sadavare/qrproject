FROM node:18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./


FROM node:18-slim

WORKDIR /app

COPY --from=builder /app ./

CMD ["node", "app.js"]

