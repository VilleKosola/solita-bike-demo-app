FROM node:18

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY [".env", "package.json", "package-lock.json*", "tsconfig.json", "./"]

RUN npm ci

COPY ./src ./src
COPY ./db ./db
COPY ./data ./data

RUN npm run build

EXPOSE 3002

CMD [ "node", "./dist/src/index.js" ]