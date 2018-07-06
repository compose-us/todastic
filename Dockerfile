FROM node:10.6.0-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
ENV PATH ./node_modules/.bin:$PATH

# Bundle app source
COPY . .

RUN lerna bootstrap
RUN lerna run build-client

EXPOSE 3000

CMD [ "npm", "run", "start-web" ]
