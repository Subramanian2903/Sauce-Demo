const { URLS } = require('../constants/urls');

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
}

module.exports = { ReqresApi };