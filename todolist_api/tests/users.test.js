const request = require('supertest');
const app = require('../app');  // Importez l'application Express

// Exemple de test pour la route GET /api/users
describe('GET http://localhost:9000/users/', () => {
  it('devrait retourner une liste d\'utilisateurs', async () => {
    const res = await request(app).get('http://localhost:9000/users/');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array'); // Assurez-vous que la réponse est un tableau
  });
});

// Exemple de test pour la route POST /api/users
describe('POST http://localhost:9000/users/register', () => {
  it('devrait créer un nouvel utilisateur', async () => {
    const user = { username:"Jean-kévin",
      password:"fougères",
      email:"kévin.fortnite@gmail.com" };
    const res = await request(app).post('http://localhost:9000/users/register').send(user);
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ username:"Jean-kévin",
    password:"fougères",
    email:"kévin.fortnite@gmail.com" });
  });
});
