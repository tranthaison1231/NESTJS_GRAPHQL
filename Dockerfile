FROM alpine:3.11

ENV NODE_VERSION 13.10.1

WORKDIR /app 

COPY package.json yarn.lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:debug"]