FROM node:16.19.0-alpine
WORKDIR /usr/app
# RUN mkdir server && cd server
ADD package* .
ADD yarn.lock .
RUN yarn
COPY . .
