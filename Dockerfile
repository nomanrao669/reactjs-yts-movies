FROM node:10
WORKDIR /usr/src/app
RUN npm install
RUN npm run build
COPY assets ./public
WORKDIR /usr/public
EXPOSE 8080