#stage 1
FROM node:16.8 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g @angular/cli@12.2.17
RUN npm i -D typescript@4.3.5
COPY . /app
RUN npm run build --prod

#stage 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-step /app/dist/ssp /usr/share/nginx/html
EXPOSE 4200:80

