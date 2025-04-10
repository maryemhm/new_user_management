# 🧑‍💻 Projet de Gestion des Utilisateurs

![CI/CD](https://github.com/maryemhm/new_user_management/actions/workflows/ci.yml/badge.svg)

## 📌 Description

Ce projet consiste à développer un système simple de gestion des utilisateurs, intégrant un frontend React, un backend Express.js, une base de données SQLite et une automatisation CI/CD avec GitHub Actions. Le tout est conteneurisé avec Docker pour garantir la portabilité et la cohérence des environnements.

---

## 🛠️ Technologies utilisées

- **Frontend** : React.js  
- **Backend** : Express.js  
- **Base de données** : SQLite  
- **Conteneurisation** : Docker, Docker Compose  
- **CI/CD** : GitHub Actions

---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Node.js et npm  
- SQLite  
- Git  
- Docker & Docker Compose  
- Postman (optionnel pour tester les APIs)

---

## 📦 Installation

### 1. Cloner le Référentiel

```bash
git clone https://github.com/maryemhm/new_user_management.git
cd new_user_management
```

---

### 2. Installation du Backend

```bash
mkdir backend && cd backend
npm init -y
npm install express sqlite3 body-parser cors
```

Créer un fichier `server.js` et collez ce code :

```js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./users.db');

db.run(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
  )
\`);

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run(\`INSERT INTO users (name, email) VALUES (?, ?)\`, [name, email], function (err) {
    if (err) res.status(500).json({ error: "L'email existe déjà ou données invalides" });
    else res.json({ id: this.lastID });
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(\`UPDATE users SET name = ?, email = ? WHERE id = ?\`, [name, email, id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ updated: this.changes });
  });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.run(\`DELETE FROM users WHERE id = ?\`, [id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ deleted: this.changes });
  });
});

app.listen(3001, () => console.log('Backend en cours d\'exécution sur le port 3001'));
```

Lancer le backend :

```bash
node server.js
```

---

### 3. Installation du Frontend

```bash
cd ..
npx create-react-app frontend11
cd frontend11
npm install axios
```

Remplacer le contenu de `src/App.js` :

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const addUser = () => {
    axios.post('http://localhost:3001/api/users', { name, email })
      .then(response => {
        setUsers([...users, { id: response.data.id, name, email }]);
        setName('');
        setEmail('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Gestion des Utilisateurs</h1>
      <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={addUser}>Ajouter</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Lancer le frontend :

```bash
npm start
```

---

## 🧪 Tester l'API avec Postman

- `GET` : http://localhost:3001/api/users  
- `POST` : http://localhost:3001/api/users  

```json
{
  "name": "maryem",
  "email": "maryemelhamdouchi12@gmail.com"
}
```

- `PUT` : http://localhost:3001/api/users/:id  
- `DELETE` : http://localhost:3001/api/users/:id  

---

## 🔁 Gestion de version avec Git

```bash
git init
git remote add origin https://github.com/maryemhm/new_user_management.git
git add .
git commit -m "Ajout du projet"
git push -u origin main
```

---

## 🐳 Dockerisation & CI/CD

Le projet utilise :

- Docker pour conteneuriser le frontend et le backend  
- Docker Compose pour orchestrer les conteneurs  
- GitHub Actions pour automatiser les tests et le déploiement

⚠️ **Problème connu** : la compilation du module `sqlite3` échoue dans l’environnement Docker malgré plusieurs tentatives de correction. En local (hors Docker), l’application fonctionne correctement.

---

## ✅ Résumé de l’état du projet

| Composant       | État        |
|------------------|-------------|
| Frontend React   | ✅ Fonctionnel |
| Backend Express  | ✅ Fonctionnel localement |
| Backend Docker   | ❌ Erreur `sqlite3` |
| CI/CD GitHub     | ✅ Fonctionnel, logs parfois tronqués |
| Tests Unitaires  | ✅ OK |
| Tests Intégration| ⚠️ Partiellement OK |

---

## 🙋‍♀️ Réalisé par

**Maryem Elhamdouchi**  
Université Mohammed V – EST Salé  
Filière : Ingénierie des applications web et mobiles  
Année universitaire : 2024/2025
