FROM node:24-alpine3.24 AS base
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --production=false && npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:1.31.6-alpine3.24

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/dist /var/www/html/

EXPOSE 5173

ENTRYPOINT ["nginx","-g","daemon off;"]