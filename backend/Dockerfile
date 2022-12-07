# split to build and run images as multi stage
FROM node:18-alpine AS build

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

RUN npm ci

COPY ./src ./src
COPY ./db ./db

RUN npm run build



FROM node:18-alpine AS production

ENV NODE_ENV=production

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

COPY ./data ./data

CMD [ "node", "./dist/src/index.js" ]

