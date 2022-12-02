FROM node:18

#development / production
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["./backend/package.json", "./backend/package-lock.json*", "./backend/tsconfig.json", "./"]

RUN npm ci

COPY ./backend/src ./src
COPY ./backend/db ./db

RUN npm run build


# google docker image build container

CMD [ "node", "./backend/dist/src/index.js" ]