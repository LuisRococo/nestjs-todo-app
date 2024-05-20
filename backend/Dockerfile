FROM node:20

WORKDIR /app

COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./

RUN yarn install

COPY ./backend/ .

CMD [ "yarn", "run", "start:dev" ]
