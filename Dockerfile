# Crear la imagen a partir de Node.js
FROM node:12.19.0

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Instalar las dependencias de la aplicación
# Un wildcard (*) se usa para asegurarse de que tanto package.json como package-lock.json sean copiados
COPY package*.json ./

RUN npm install
# Si estás construyendo el código para producción
# RUN npm ci --only=production

# Copiar los demás archivos de la aplicación
COPY . .

# Hacer que el puerto 3000 esté disponible para el mundo fuera de este contenedor
EXPOSE 3000

# Correr la aplicación cuando el contenedor se inicie
CMD [ "npm", "start" ]