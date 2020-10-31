FROM node:12

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

EXPOSE 3001

CMD [ "npm", "start" ]
