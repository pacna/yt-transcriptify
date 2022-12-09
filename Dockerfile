FROM node:14.21.1

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]