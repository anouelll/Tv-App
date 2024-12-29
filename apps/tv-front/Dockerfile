FROM node:18-alpine AS base 

WORKDIR /tv_app

COPY package.json package-lock.json ./
RUN npm install 

COPY . . 


FROM base AS development

EXPOSE 4200 

CMD ["npx", "nx", "serve", "tv-front"]

FROM base AS build 

RUN npx nx build tv-front --prod 

FROM nginx:alpine AS production 

COPY --from=build /tv_app/dist/apps/tv-front /usr/share/nginx/html

EXPOSE 80 

CMD [ "nginx", "-g", "daemon off;" ]