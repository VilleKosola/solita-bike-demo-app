#run app
FROM nginx:1.23.1-alpine
# COPY /usr/app/public /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]