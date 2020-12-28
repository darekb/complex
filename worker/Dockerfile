FROM node:12.20.0-alpine3.11
WORKDIR '/home/app'
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"]