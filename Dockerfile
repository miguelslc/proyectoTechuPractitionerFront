# Imagen base
FROM node:latest

# Directorio de la app
WORKDIR /app

# Copiado de archivos
ADD build/prod /app/build/prod
ADD server.js /app
ADD package.json /app

# Dependencias
RUN npm install

# Puerto que expongo
EXPOSE 3000

# Comandos
CMD ["npm", "run", "start"]