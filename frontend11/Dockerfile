# Image de base
FROM node:18

# Création du dossier de travail
WORKDIR /app

# Copie des fichiers de package
COPY frontend11/package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du frontend
COPY frontend11/ .

# Port exposé
EXPOSE 3000

# Commande pour démarrer React
CMD ["npm", "start"]
