// API teszt suite a Task Management API-hoz

// Endpoints for testing: 
// POST /tasks -> create a new task
// GET /tasks/{id} -> retrieve the task
// PUT /tasks/{id} -> update the task
// DELETE /tasks/{id} -> delete the task


const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';
// to store taskid
let taskId;


//  Test Management API Test Suite
test.describe('Task Management API Test Suite', () => {

  // POST /tasks
  test('POST /tasks - create a new task', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/tasks`, {
      data: { title: 'API Test', completed: false },
    });

    // Validation example - Status code
    expect(response.status()).toBe(201);

    // Validation example - Response Body
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('API Test');

    taskId = body.id; 
  });



  // GET /tasks/{id}
  test('GET /tasks/{id} - retrieve the task', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tasks/${taskId}`);

    // Validation example - Status code
    expect(response.status()).toBe(200); // OK

    // Validation example - Response Body
    const body = await response.json();
    expect(body.id).toBe(taskId);
  });



  // PUT /tasks/{id}
  test('PUT /tasks/{id} - update the task', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/tasks/${taskId}`, {
      data: { title: 'Learn Playwright (updated)', completed: true },
    });

    // Validation example - Status code
    expect(response.status()).toBe(200); 

    // Validation example - Response Body
    const body = await response.json();
    expect(body.completed).toBe(true);
  });



  // DELETE /tasks/{id}
  test('DELETE /tasks/{id} - delete the task', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/tasks/${taskId}`);

  // Validation example - Status code
    expect(response.status()).toBe(204); 
  });

});