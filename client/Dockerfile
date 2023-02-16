FROM node:16.19.0-alpine
WORKDIR /usr/app
ADD package* .
ADD yarn.lock .
RUN yarn
COPY . .