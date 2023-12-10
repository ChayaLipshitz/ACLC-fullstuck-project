FROM node:lts-alpine3.18

WORKDIR /nodejs

COPY package.json package-lock.json* ./
RUN npm cache clear --force && npm install && \   
    npm i dotenv

# copy the content of the local src directory to the working directory
COPY . .

# Command to start the application
CMD [ "node", "./index.js" ]