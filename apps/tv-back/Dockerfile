FROM node:20-alpine3.19 AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development --silent
COPY . .
RUN npx nx build api --prod

FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production --silent
COPY --from=builder /usr/src/app/dist/apps/tv-back ./build
ENTRYPOINT ["node","build/main.js"]
