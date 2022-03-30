FROM node:10-alpine

RUN yarn global add pm2

RUN mkdir /root/app

ADD . /root/app

WORKDIR /root/app

RUN yarn --pure-lockfile
RUN yarn cache clean

CMD [ "pm2-runtime", "start", "ecosystem.config.js"]
