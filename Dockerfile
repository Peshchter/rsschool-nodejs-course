FROM node:14.17-alpine
WORKDIR /usr/app
RUN npm i -g @nestjs/cli
COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

