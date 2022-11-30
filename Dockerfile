FROM node:lts-dubnium
WORKDIR /usr
RUN ls -l
RUN npm install
RUN ls -l
RUN npm run build
COPY assets ./public
WORKDIR /usr/public
EXPOSE 8080