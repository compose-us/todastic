FROM node:10.7.0

RUN mkdir /app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --quiet
ENV PATH ./node_modules/.bin:$PATH

# Bundle app source
COPY . .

RUN lerna bootstrap
RUN lerna run build-client

EXPOSE 3000

CMD [ "npm", "run", "start-web" ]
