const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';


test.describe('Task Management API - Error Handling', () => {

  // 400 - Missing title
  test('POST /tasks - should return 400 when title is missing', async ({ request }) => {

    const response = await request.post(`${BASE_URL}/tasks`, {
      data: {
        completed: false
      }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.message).toBe('Title and completed fields are required');
  });


  // 400 - Invalid completed
  test('POST /tasks - should return 400 when completed is invalid', async ({ request }) => {

    const response = await request.post(`${BASE_URL}/tasks`, {
      data: {
        title: 'API Test',
        completed: 'false'
      }
    });

    expect(response.status()).toBe(400);
  });


  // 404 - GET
  test('GET /tasks/:id - should return 404', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/tasks/99999`);

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Task not found');
  });


  // 404 - PUT
  test('PUT /tasks/:id - should return 404', async ({ request }) => {

    const response = await request.put(`${BASE_URL}/tasks/99999`, {
      data: {
        title: 'Updated',
        completed: true
      }
    });

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Task not found');
  });


  // 404 - DELETE
  test('DELETE /tasks/:id - should return 404', async ({ request }) => {

    const response = await request.delete(`${BASE_URL}/tasks/99999`);

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Task not found');
  });


  // 404 - Unknown endpoint
  test('GET unknown endpoint - should return 404', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/unknown`);

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Endpoint not found');
  });


  // 405
  test('PATCH /tasks - should return 405', async ({ request }) => {

    const response = await request.patch(`${BASE_URL}/tasks`, {
      data: {}
    });

    expect(response.status()).toBe(405);

    const body = await response.json();
    expect(body.message).toBe('Method Not Allowed');
  });


  // 204
  test('DELETE /tasks/:id - should return 204 after successful delete', async ({ request }) => {

    const create = await request.post(`${BASE_URL}/tasks`, {
      data: {
        title: 'Delete me',
        completed: false
      }
    });

    const task = await create.json();

    const response = await request.delete(`${BASE_URL}/tasks/${task.id}`);

    expect(response.status()).toBe(204);
  });


  // 500
  test('GET /error - should return 500', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/error`);

    expect(response.status()).toBe(500);

    const body = await response.json();
    expect(body.message).toBe('Internal server error');
  });

});