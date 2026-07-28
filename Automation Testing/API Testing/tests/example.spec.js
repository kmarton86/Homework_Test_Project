const { test, expect } = require('@playwright/test');


const API_URL = 'https://api.example.com';


test.describe('Task Management API Tests', () => {


    let taskId;


    // POST /tasks
    test('Create a new task - POST /tasks', async ({ request }) => {


        const response = await request.post(`${API_URL}/tasks`, {

            data: {
                title: 'Test Task',
                description: 'Created by Playwright API test',
                completed: false
            }

        });


        expect(response.status()).toBe(201);


        const body = await response.json();


        expect(body.title).toBe('Test Task');


        taskId = body.id;


    });



    // GET /tasks/{id}
    test('Get task by ID - GET /tasks/{id}', async ({ request }) => {


        const response = await request.get(
            `${API_URL}/tasks/${taskId}`
        );


        expect(response.status()).toBe(200);


        const body = await response.json();


        expect(body.id).toBe(taskId);


    });



    // PUT /tasks/{id}
    test('Update task by ID - PUT /tasks/{id}', async ({ request }) => {


        const response = await request.put(
            `${API_URL}/tasks/${taskId}`,
            {

                data: {
                    title: 'Updated Task',
                    completed: true
                }

            }
        );


        expect(response.status()).toBe(200);


        const body = await response.json();


        expect(body.title).toBe('Updated Task');


    });



    // DELETE /tasks/{id}
    test('Delete task by ID - DELETE /tasks/{id}', async ({ request }) => {


        const response = await request.delete(
            `${API_URL}/tasks/${taskId}`
        );


        expect(response.status()).toBe(204);


    });


});