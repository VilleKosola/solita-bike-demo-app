# build app
FROM node:18-alpine AS build
ENV NODE_ENV=production
WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]
RUN npm ci --only=production --ignore-scripts
COPY . ./
RUN npm run build


#run app
FROM nginx:1.23.1-alpine
ENV NODE_ENV production
COPY --from=build /usr/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]