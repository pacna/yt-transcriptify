FROM node:16.20.0

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]