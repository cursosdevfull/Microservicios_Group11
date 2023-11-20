FROM node:20.9.0-alpine3.18

RUN apk add curl

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD npm start