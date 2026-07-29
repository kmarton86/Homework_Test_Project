// API teszt suite a Task Management API-hoz

// Endpoints for testing: 
// POST /tasks -> create a new task
// GET /tasks/{id} -> retrieve the task
// PUT /tasks/{id} -> update the task
// DELETE /tasks/{id} -> delete the task


const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';


// Test Management API Test Suite
test.describe('Task Management API Test Suite', () => {

  // Reset the MOCK server before tests
  test.beforeAll(async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/reset`);
    expect(response.status()).toBe(204);
  });


  // POST test
  test('POST /tasks - create a new task', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/tasks`, {
      data: { title: 'Task Test1', completed: false },
    });

    // Validation - Status code
    expect(response.status()).toBe(201);

    // Validation - Response Body
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Task Test1');
  });



  // GET test
  test('GET /tasks/{id} - retrieve the task', async ({ request }) => {

    // POST call - create a Task Test2 for this test
    const createResponse = await request.post(`${BASE_URL}/tasks`, {
      data: { title: 'Task Test2', completed: false },
    });

    expect(createResponse.status()).toBe(201);

    const createdTask = await createResponse.json();

    // GET call - retrieve the task
    const response = await request.get(`${BASE_URL}/tasks/${createdTask.id}`);

    // Validation - Status code
    expect(response.status()).toBe(200); // OK

    // Validation - Response Body
    const body = await response.json();
    expect(body.id).toBe(createdTask.id);
    expect(body.title).toBe('Task Test2');
    expect(body.completed).toBe(false);
  });



  // PUT test
  test('PUT /tasks/{id} - update the task', async ({ request }) => {

    // POST call - create a task for this test
    const createResponse = await request.post(`${BASE_URL}/tasks`, {
      data: { title: 'Task Test3', completed: false },
    });

    expect(createResponse.status()).toBe(201);

    const createdTask = await createResponse.json();

    // PUT call - update the task
    const response = await request.put(`${BASE_URL}/tasks/${createdTask.id}`, {
      data: { title: 'Task Test 3 (updated)', completed: true },
    });

    // Validation - Status code - OK
    expect(response.status()).toBe(200);

    // Validation - Response Body
    const body = await response.json();
    expect(body.id).toBe(createdTask.id);
    expect(body.title).toBe('Task Test 3 (updated)');
    expect(body.completed).toBe(true);
  });



  // DELETE test
  test('DELETE /tasks/{id} - delete the task', async ({ request }) => {

    // POST call - create a task for this test
    const createResponse = await request.post(`${BASE_URL}/tasks`, {
      data: { title: 'Task Test 4', completed: false },
    });

    expect(createResponse.status()).toBe(201);

    const createdTask = await createResponse.json();

    // DELETE call - delete the task
    const response = await request.delete(`${BASE_URL}/tasks/${createdTask.id}`);

    // Validation - Status code - task is deleted successfully
    expect(response.status()).toBe(204);
  });

});