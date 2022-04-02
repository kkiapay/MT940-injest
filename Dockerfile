FROM node:16-alpine

WORKDIR /usr/src/kkiapay

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY prisma/schema.prisma ./prisma/
RUN npm run prisma:generate

COPY . .
RUN npm run build:prod
