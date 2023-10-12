FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g typescript

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/src/app.js"]