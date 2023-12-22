# Usa la imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000 (o el puerto que estés utilizando en tu aplicación Nest.js)
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]