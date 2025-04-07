# Utilisation de l'image de base Node.js
FROM node:18

# Mise à jour des paquets système et installation de bibliothèques nécessaires
RUN apt-get update && apt-get install -y \
    libc6-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de package (package.json et package-lock.json)
COPY frontend11/package*.json ./

# Installation des dépendances avec l'option legacy-peer-deps pour éviter les conflits de dépendances
RUN npm install --legacy-peer-deps

# Copie du reste du frontend
COPY frontend11/ .

# Exposition du port sur lequel l'application React écoute
EXPOSE 3000

# Commande pour démarrer l'application React en mode développement
CMD ["npm", "start"]
