FROM node:20

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

CMD [ "yarn", "run", "dev" ]
