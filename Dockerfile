FROM node:10
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
COPY assets ./public
WORKDIR /public
EXPOSE 8081
CMD [ "npx", "serve", "build" ]