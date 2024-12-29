FROM node:19.5.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --only=development --silent
COPY . .
RUN npx nx build tv-back --prod
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g pm2@latest
RUN npm install --only=production --silent
RUN npm install express
COPY --from=builder /app/dist/apps/tv-back ./build
ENTRYPOINT ["pm2-runtime","build/main.js"]