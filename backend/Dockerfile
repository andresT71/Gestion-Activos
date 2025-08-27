# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Instalar sqlite3 dependencias si es necesario
RUN apk add --no-cache sqlite

# Crear directorio para la base de datos y dar permisos
RUN mkdir -p /app/database && chown -R node:node /app

# Cambiar a usuario no-root por seguridad
USER node

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
