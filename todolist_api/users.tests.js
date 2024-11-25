const request = require('supertest');
const app = require('./app'); // Adjust the path to your app

// Import necessary modules

describe('User API tests', () => {
    // Test for getting all users
    it('should get all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test for getting a single user by ID
    it('should get a user by ID', async () => {
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
    });

    // Test for creating a new user
    it('should create a new user', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com'
        };
        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    // Test for updating a user
    it('should update a user', async () => {
        const userId = 1; // Replace with a valid user ID
        const updatedUser = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com'
        };
        const response = await request(app).put(`/users/${userId}`).send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('name', updatedUser.name);
        expect(response.body).toHaveProperty('email', updatedUser.email);
    });

    // Test for deleting a user
    it('should delete a user', async () => {
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.status).toBe(204);
    });
});
