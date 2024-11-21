# Etapa 1: Construcción
FROM node:18 AS build
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:alpine
COPY --from=build /app/dist/hold-me-app /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
