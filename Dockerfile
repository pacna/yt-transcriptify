FROM node:14.15.4

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]