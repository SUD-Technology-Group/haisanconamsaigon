FROM node:alpine

# Create a app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Run npm install
RUN npm install

# Bundle app source

COPY . .

CMD ["npm", "start"]


