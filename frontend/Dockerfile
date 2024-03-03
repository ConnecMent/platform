FROM node:18.17

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

ARG API_PORT
ARG API_HOST
RUN VITE_API_HOST=${API_HOST} VITE_API_PORT=${API_PORT} npm run build

CMD ["npm", "run", "preview"]
