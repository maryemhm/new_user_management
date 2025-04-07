# Image de base
FROM node:18

# Création du dossier de travail
WORKDIR /app

# Copie des fichiers de package
COPY backend/package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code backend
COPY backend/ .

# Port exposé
EXPOSE 3001

# Commande de lancement
CMD ["node", "server.js"]
