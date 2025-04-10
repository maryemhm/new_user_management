const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
const db = require('../../db'); // Module de base de données simulé

chai.use(chaiAsPromised);

// Fonction à tester
const { getUserById } = require('../../controllers/userController');

describe('User Controller - Unit Tests', () => {
  afterEach(() => sinon.restore());

  it('getUserById devrait retourner un utilisateur existant', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    sinon.stub(db, 'query').resolves([mockUser]); // Stub de la base de données

    const user = await getUserById(1);
    expect(user).to.deep.equal(mockUser);
  });

  it('getUserById devrait lancer une erreur si l\'utilisateur n\'existe pas', async () => {
    sinon.stub(db, 'query').resolves([]);
    await expect(getUserById(999)).to.be.rejectedWith('Utilisateur non trouvé');
  });
});