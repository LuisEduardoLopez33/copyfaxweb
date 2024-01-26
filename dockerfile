FROM node:18.16.1-alpine3.18 AS build

RUN mkdir app
WORKDIR /app

COPY package*.json .
RUN npm  install 

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
