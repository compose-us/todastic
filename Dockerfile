FROM node:10.7.0

RUN mkdir /app
RUN chown node /app
USER node
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

RUN npm install
ENV PATH ./node_modules/.bin:$PATH

# Bundle app source
COPY --chown=node:node . .

RUN lerna bootstrap
RUN lerna run build-client

EXPOSE 3000

CMD [ "npm", "run", "start-web" ]
