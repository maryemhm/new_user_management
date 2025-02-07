// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const addUser = async () => {
    if (!name || !email || !age) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users', { name, email, age: parseInt(age, 10) });
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      alert('Échec de l\'ajout de l\'utilisateur. Veuillez réessayer.');
    }
  };

  const updateUser = async () => {
    if (!name || !email || !age) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/users/${editingUser.id}`, { name, email, age: parseInt(age, 10) });
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      alert('Échec de la modification. Veuillez réessayer.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      alert('Échec de la suppression. Veuillez réessayer.');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAge('');
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>Gestion des Utilisateurs</h1>
      <div className="form-group">
        <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Âge" type="number" value={age} onChange={e => setAge(e.target.value)} />
        {editingUser ? (
          <button onClick={updateUser} className="btn btn-success">Modifier</button>
        ) : (
          <button onClick={addUser} className="btn btn-primary">Ajouter</button>
        )}
      </div>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <span>{user.name} ({user.email}, {user.age} ans)</span>
            <div>
              <button onClick={() => { setEditingUser(user); setName(user.name); setEmail(user.email); setAge(user.age.toString()); }} className="btn btn-warning">Modifier</button>
              <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// Styles CSS intégrés
const styles = `
.container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.user-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}
.user-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.btn {
  padding: 10px;
  border: none;
  cursor: pointer;
  margin: 5px;
  color: white;
}
.btn-primary { background-color: #007bff; }
.btn-success { background-color: #28a745; }
.btn-warning { background-color: #ffc107; }
.btn-danger { background-color: #dc3545; }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
