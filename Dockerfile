
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.crt /etc/ssl/   
COPY nginx/nginx.key /etc/ssl
COPY build/ /usr/share/nginx/html