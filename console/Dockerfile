#stage 1
FROM node:20.7 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/nbot-server-ui /usr/share/nginx/html
