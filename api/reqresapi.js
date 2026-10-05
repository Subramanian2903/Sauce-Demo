const { URLS } = require('../constants/urls');
const { expect } = require('@playwright/test');

class ReqresApi {
    constructor(request) {
        this.request = request;
    }

    async getUser(id) {
        return await this.request.get(`${URLS.REQRES_BASE}/users/${id}`);
    }

    async getUsers(page) {
        return await this.request.get(`${URLS.REQRES_BASE}/users?page=${page}`);
    }

    async verifyStatusCode(response, expectedStatus) {
         expect(response.status()).toBe(expectedStatus);
    }
}

module.exports = { ReqresApi };