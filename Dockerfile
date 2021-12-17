FROM node:current-alpine

COPY . .

RUN npm install

RUN npm run test

ENTRYPOINT exec npm start

EXPOSE 3000