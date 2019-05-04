
FROM node:10-alpine as builder

RUN echo "http://mirrors.aliyun.com/alpine/v3.8/main" > /etc/apk/repositories
RUN echo "http://mirrors.aliyun.com/alpine/v3.8/community" >> /etc/apk/repositories

RUN apk add --no-cache make gcc g++ python

RUN npm config set registry 'https://registry.npm.taobao.org'
RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN npm install -g yarn

WORKDIR /src

COPY package.json yarn.lock /src/
RUN yarn install --production

COPY . /src



FROM node:10-alpine

RUN npm config set registry 'https://registry.npm.taobao.org'
RUN npm install -g pm2

WORKDIR /app

COPY --from=builder /src/ /app/

EXPOSE 3000

CMD [ "pm2-docker", "--json", "--instances", "0", "server/server.js" ]