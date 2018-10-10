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

RUN npm run bootstrap
RUN npm run build

VOLUME /app/coverage
EXPOSE 3000

CMD [ "npm", "run", "start-web" ]
