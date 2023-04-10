FROM node:16-alpine3.16 as build
WORKDIR /app

COPY package*.json ./
RUN npm install
#RUN npm install tslib
COPY . .
