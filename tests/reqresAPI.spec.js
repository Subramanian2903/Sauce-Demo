const { test, expect } = require('@playwright/test');
const { ReqresApi } = require('../api/reqresapi.js');
const { API_DATA } = require('../testData/apiData.js');

test.describe('Reqres User APIs', () => {
    test('Get single user', async ({ request }) => {
        const api = new ReqresApi(request);
        const response = await api.getUser(API_DATA.USER_ID);

        api.verifyStatusCode(response, 200);

        const body = await response.json();
        expect(body.data.id).toBe(API_DATA.USER_ID);
        expect(body.data.email).toContain('@reqres.in');
    });

    test('Get users for a page', async ({ request }) => {
        const api = new ReqresApi(request);
        const response = await api.getUsers(API_DATA.USER_PAGE);

        api.verifyStatusCode(response, 200);

        const body = await response.json();
        expect(body.page).toBe(API_DATA.USER_PAGE);
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data.length).toBeGreaterThan(0);
        expect(body.data[0].id).toBeGreaterThan(0);
    });
});
