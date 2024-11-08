const request = require('supertest');
const app = require('../app');  // Importez l'application Express
const { expect } = require('chai');

// Exemple de test pour la route GET /api/users
describe('GET /api/users', () => {
  it('devrait retourner une liste d\'utilisateurs', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array'); // Assurez-vous que la réponse est un tableau
  });
});

// Exemple de test pour la route POST /api/users
describe('POST /api/users', () => {
  it('devrait créer un nouvel utilisateur', async () => {
    const user = { name: 'Test User', email: 'test@example.com' };
    const res = await request(app).post('/api/users').send(user);
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ name: 'Test User', email: 'test@example.com' });
  });
});
