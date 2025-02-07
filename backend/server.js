// Importation des modules nécessaires
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialisation de l'application Express
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

// Création de la table des utilisateurs si elle n'existe pas
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER
    )
`, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la table:', err.message);
    } else {
        console.log('Table des utilisateurs prête.');
    }
});

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur le backend de gestion des utilisateurs !');
});

// Route pour obtenir tous les utilisateurs
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Route pour ajouter un utilisateur
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;
    db.run(
        'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
        [name, email, age],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID, name, email, age });
            }
        }
    );
});

// Route pour mettre à jour un utilisateur
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    db.run(
        'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
        [name, email, age, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'Utilisateur non trouvé.' });
            } else {
                res.json({ id, name, email, age });
            }
        }
    );
});

// Route pour supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
        } else {
            res.json({ message: 'Utilisateur supprimé avec succès.' });
        }
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
