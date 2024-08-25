FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

## Config pour EC2 AWS

#Récupérer image depuis DockerHub
#FROM bugbstrspro/luxiergerie-front:main AS frontend-source

#Install Node.js pour construire l'app
# FROM node:18-alpine AS build

#WORKDIR /usr/src/app

#Copie du code source depuis l'image
#COPY --from=frontend-source /usr/src/app /usr/src/app

#Installer les dépendances
#RUN npm install

#Construire l'application
#RUN npm run build --prod

#Utiliser Nginx pour servir l'application
#FROM nginx:alpine

#Copier les fichiers de l'application builder dans le répertoire de Nginx
#COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

#Copier les réglages de configuration de Nginx
#COPY ./nginx.conf /etc/nginx/nginx.conf

#Exposer le port 80
#EXPOSE 80

#Démarrer Nginx
#CMD ["nginx", "-g", "daemon off;"]
