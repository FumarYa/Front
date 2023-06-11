# Primera Etapa - Crear la aplicación React
FROM node:12.19.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

# Segunda Etapa - Servir la aplicación con Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]