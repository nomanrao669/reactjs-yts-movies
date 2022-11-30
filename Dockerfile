FROM node:10
WORKDIR /
RUN npm install
RUN npm run build
COPY assets ./public
WORKDIR /public
EXPOSE 8081