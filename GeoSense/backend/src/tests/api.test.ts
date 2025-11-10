import request from 'supertest';
import app from '../app'; // Adjust the path as necessary

describe('API Endpoints', () => {
  it('should return a 200 status for the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should get traffic data', async () => {
    const response = await request(app).get('/api/traffic');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should get points of interest', async () => {
    const response = await request(app).get('/api/poi');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should return a 404 for an unknown endpoint', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).toBe(404);
  });
});