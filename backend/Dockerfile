FROM mhart/alpine-node:latest
RUN npm install -g nodemon
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
ADD . /opt/app
EXPOSE 1102
CMD ["nodemon", "server.js"]
