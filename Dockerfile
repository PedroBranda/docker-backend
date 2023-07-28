FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install yarn

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
