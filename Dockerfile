FROM node:latest AS build

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

LABEL maintainer="Alexander Ivanov <oz.sasha.ivanov@gmail.com>"

WORKDIR /var/www

COPY --from=build /app/dist .
