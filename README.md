***Projet de Gestion des Utilisateurs***

**Description**

**Un système simple de gestion des utilisateurs développé avec :**

+Backend : Express.js

+Frontend : React

+Base de données : SQLite

+Prérequis

**Assurez-vous d'avoir installé les éléments suivants :**

+Node.js (inclut npm)

+SQLite

+Git

+Postman (optionnel, pour tester l'API)

**Installation**

**1. Cloner le Référentiel :**
***************************************************************
git clone https://github.com/maryemhm/new_user_management.git
cd new_user_management
***************************************************************
**2. Installation du Backend :**
********************************************
mkdir backend && cd backend
npm init -y
npm install express sqlite3 body-parser cors
**********************************************
**Créez un fichier server.js et ajoutez le code suivant :**
*******************************************************************************************************************************
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./users.db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
  )
`);

app.get('http://localhost:3001/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('http://localhost:3001/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function (err) {
    if (err) {
      res.status(500).json({ error: "L'email existe déjà ou données invalides" });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

app.put('http://localhost:3001/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ updated: this.changes });
    }
  });
});

app.delete('http://localhost:3001/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

app.listen(3001, () => console.log('Backend en cours d'exécution sur le port 3001'));
*******************************************************************************************************************
**Lancez le serveur backend :**
*********************
node server.js
*********************
**3. Installation du Frontend**
*******************************
cd ..
npx create-react-app frontend11
cd frontend11
npm install axios
*******************************
**Modifiez src/App.js :**
*******************************************************************************************************************
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
      <div>
        <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={addUser}>Ajouter un utilisateur</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
**********************************************************************************************************
**Lancez le serveur frontend :**
************
npm start
**********
**4. Tester l'API avec Postman :**

+Téléchargez et installez Postman depuis Postman.com.

+Démarrez votre serveur en exécutant node server.js.

+Ouvrez Postman et créez une nouvelle requête HTTP.

**Tester les routes :**

+GET http://localhost:3001/api/users pour récupérer les utilisateurs.

+POST http://localhost:3001/api/users pour ajouter un utilisateur avec un JSON :
**********************************************************************************
{
  "name": "maryem",
  "email": "maryemelhamdouchi12@gmail.com"
}
***********************************************************************************
+PUT http://localhost:3001/api/users/:id pour modifier un utilisateur.

+DELETE http://localhost:3001/api/users/:id pour supprimer un utilisateur.

**5. Gestion des Versions avec Git :**
******************************************************************************
git init
git remote add origin https://github.com/maryemhm/new_user_management.git
git add .
git commit -m "ajoute dans github"
git push -u origin main
********************************************************************************
Votre projet est maintenant entièrement configuré et prêt à être utilisé !

