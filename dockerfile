FROM node:20

WORKDIR /app

COPY package-lock.json package-lock.json

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm","run","start" ]