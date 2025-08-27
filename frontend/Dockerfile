# frontend/Dockerfile
# Etapa 1: Build de la aplicación
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2 - Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos built desde la etapa 'build'
COPY --from=build /app/dist/inventario-ti-angular /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
