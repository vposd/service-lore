### STAGE 1: Build
FROM node:buster-slim as builder
COPY src/Lore.Web/Client/package.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install
RUN mkdir /frontend
RUN cp -R ./node_modules ./frontend
WORKDIR /frontend
COPY src/Lore.Web/Client .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod

### STAGE 2: Setup
FROM nginx:alpine

## Copy our default nginx config
COPY src/Lore.Web/Client/nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /frontend/dist /usr/share/nginx/html
