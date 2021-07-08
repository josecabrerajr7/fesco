FROM node:16.4.2

WORKDIR /home/node/app

ADD "./package.json" "/home/node/app/package.json"

RUN ["npm", "install"]

CMD ["npm", "start"]