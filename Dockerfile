FROM httpd:alpine

WORKDIR /usr/local/apache2/htdocs

ADD ./dist .