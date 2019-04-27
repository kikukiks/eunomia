FROM node:alpine

ENV NODE_ENV production

RUN apk update
RUN apk add bash vim

ENV NODE_ENV production
ENV DB_ENV live
ENV PORT 3000

EXPOSE 3000

RUN mkdir /opt/app
WORKDIR /opt/app

COPY ./package.json /opt/app
RUN npm install --only=production
COPY . /opt/app