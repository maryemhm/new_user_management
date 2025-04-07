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
COPY backend/package*.json ./

# Installation des dépendances
RUN npm install --legacy-peer-deps

# Copie du reste des fichiers du backend
COPY backend/ .

# Exposition du port sur lequel l'application écoute
EXPOSE 3001

# Commande de lancement du serveur backend
CMD ["node", "server.js"]
