## Luxiergerie

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## DOCKER

Build image
docker build -t luxiergerie-front .
docker run -p 4201:4200 luxiergerie-front

Fixer les permissions de docker sur EC2 :
  -sudo chown -R ubuntu:ubuntu /home/ubuntu/nginx
  -sudo chown -R ubuntu:ubuntu /home/ubuntu/docker
  -sudo chmod -R 755 /home/ubuntu/nginx
  -sudo chmod -R 755 /home/ubuntu/docker

## DOCKER COMPOSE FOR PRODUCTION (EC2)

services:
  luxiergerie-backend:
    image: "image name from docker hub"
    environment:
      - SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
      - SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
      - SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
      - SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
    ports:
      - "0000:0000"
    networks:
      - luxiergerie-network

  luxiergerie-frontend:
    image: "image name from docker hub"
    build:
      context: .
      dockerfile: DockerFile
      ports:
        - "0000:0000"
      environment:
        - API_URL= url du backend, ex : http://xx.xxx.xx.xxx:9080/api
      networks:
        - luxiergerie-network
      depends_on:
        - luxiergerie-backend
networks:
  luxiergerie-network:
    driver: bridge

## NGINX EC2 CONFIGURATION

Configuration Nginx pour SSL et HTTPS (nginx présent sur EC2 avec CERBOT pour le reverse proxy)

user nginx;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
  Redirection HTTP vers HTTPS
  server {
    listen 80;
         server_name luxiergerie.tech www.luxiergerie.tech;
         # Route pour Certbot
         location /.well-known/acme-challenge/ {
             root /var/www/certbot;
         }
         # Redirection vers HTTPS
         location / {
             return 301 https://$host$request_uri;
         }
     }

     Configuration HTTPS avec reverse proxy
     server {
         listen 443 ssl;
         server_name luxiergerie.tech www.luxiergerie.tech;

         Certificats SSL Let's Encrypt
         ssl_certificate /etc/letsencrypt/live/luxiergerie.tech/fullchain.pem;
         ssl_certificate_key /etc/letsencrypt/live/luxiergerie.tech/privkey.pem;

         Protocoles et paramètres de sécurité SSL
         ssl_protocols TLSv1.2 TLSv1.3;
         ssl_ciphers HIGH:!aNULL:!MD5;
         ssl_prefer_server_ciphers on;
         ssl_session_cache shared:SSL:10m;
         ssl_session_timeout 1d;
         ssl_session_tickets off;

         HSTS (Strict-Transport-Security) pour renforcer la sécurité
         add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

         Reverse proxy pour le frontend (Angular app)
         location / {
             proxy_pass http://localhost:+"port du front";
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }

         Proxy pour le backend
         location /api {
             proxy_pass http://localhost:+ "port du backend";
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }

         Gestion des erreurs
         error_page 404 /404.html;
         location = /404.html {
             root /usr/share/nginx/html;
         }
     }
 }

## NGINX CONFIGURATION FOR EC2 DOCKER IMAGE
user nginx;
worker_processes auto;
pid /run/nginx.pid;

events {
  worker_connections 1024;
}
http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  sendfile on;
  keepalive_timeout 65;

  server {
    listen 80;

    Localhost car à l'intérieur du conteneur
    server_name localhost;

    Le root ici pointe vers le dossier principal contenant les fichiers statiques
    root /usr/share/nginx/html/luxiergerie/fr;
    index index.html;

    location / {
      Le root pointe vers le sous-dossier contenant les fichiers Angular
      root /usr/share/nginx/html/luxiergerie/fr/fr;
      index index.html;
      try_files $uri $uri/ /index.html;
    }

    Gestion des fichiers JS, CSS et fonts avec ajout de headers appropriés
    location ~ \.js$ {
    add_header Content-Type application/javascript;
    }

    location ~ \.css$ {
      add_header Content-Type text/css;
    }

    location ~ \.woff2?$ {
      add_header Content-Type font/woff2;
    }

    Redirection des requêtes vers le serveur de l'API backend
    location /api {
      Proxy pass vers le backend
      proxy_pass http://localhost:+ "port du backend";

    Paramètres de proxy pour s'assurer que les headers sont correctement transmis
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

    Ajout de l'en-tête Authorization si le token est nécessaire pour l'API
      proxy_set_header Authorization $http_authorization;

    En-têtes CORS pour toutes les requêtes
      add_header 'Access-Control-Allow-Origin' 'https://luxiergerie.tech' always;
      add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
      add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Content-Type, Accept, token, Token' always;

    Gérer les requêtes OPTIONS (preflight)
      if ($request_method = OPTIONS) {
        add_header 'Access-Control-Allow-Origin' 'https://luxiergerie.tech' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Content-Type, Accept, token, Token' always;
        add_header 'Access-Control-Max-Age' 1728000; # facultatif, permet de cacher le preflight
        return 204;
      }
    }

    Ajout d'une gestion des erreurs pour améliorer le debug
    error_page 404 /404.html;
    location = /404.html {
      root /usr/share/nginx/html;
    }
  }
}

## DOCKERFILE FOR PRODUCTION (EC2)

Récupérer image depuis DockerHub
FROM bugbstrspro/luxiergerie-front:main AS frontend-source

Install Node.js pour construire l'app
FROM node:18-alpine AS build

WORKDIR /usr/src/app

Copie du code source depuis l'image
COPY --from=frontend-source /usr/src/app /usr/src/app

Installer les dépendances
RUN npm install

Construire l'application
RUN npm run build --prod

Utiliser Nginx pour servir l'application
FROM nginx:alpine

Copier les fichiers de l'application builder dans le répertoire de Nginx
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

Copier les réglages de configuration de Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

Exposer le port 80
EXPOSE 80

Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

## AMAZON AWS COMMANDS

Commande depuis EC2 afin d'injecter un fichier d'import SQL
mysql -h <RDS endpoint> -P 3306 -u <username> -p <database name> </path/to/file.sql>

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
