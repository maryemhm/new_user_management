# backend/Dockerfile
# Utiliser une version spécifique de Node.js pour plus de stabilité
FROM node:14-bullseye

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Copier uniquement les fichiers package.json pour optimiser le cache Docker
COPY package.json package-lock.json ./

# Supprimer node_modules s'il existe (au cas où il serait copié depuis l'hôte)
RUN rm -rf node_modules

# Installer les dépendances Node.js, y compris sqlite3
RUN npm install --unsafe-perm

# Copier le reste de l'application
COPY . .

# Configurer la base de données avec les bonnes permissions
RUN mkdir -p /data && \
    touch /data/users.db && \
    chown -R node:node /data

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=3001
ENV DB_PATH=/data/users.db

# Utiliser un utilisateur non-root pour plus de sécurité
USER node

# Exposer le port de l'application
EXPOSE 3001

# Commande par défaut pour démarrer l'application
CMD ["node", "server.js"]