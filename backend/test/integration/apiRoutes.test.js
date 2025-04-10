const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server'); // Assurez-vous que ce chemin pointe vers votre fichier principal du serveur

chai.use(chaiHttp);
const { expect } = chai;

describe('API Routes - Integration Tests', () => {
  it('GET /api/users devrait retourner 200', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('POST /api/users devrait créer un nouvel utilisateur', async () => {
    const res = await chai.request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'test@example.com', age: 25 });
    
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
  });
});