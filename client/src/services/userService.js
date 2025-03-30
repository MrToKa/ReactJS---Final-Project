const baseUrl = 'http://localhost:3030/users';

export default {
    async getAll() {
        const response = await fetch(baseUrl);
        const users = await response.json();
        return Object.values(users);
    },

    async getById(id) {
        const response = await fetch(`${baseUrl}/${id}`);
        return await response.json();
    },

    async create(user) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return await response.json();
    },

    async update(id, user) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return await response.json();
    },

    delete(id) {
        return fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
    },

    async login(email, password) {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return await response.json();
    },

    async logout() {
        const response = await fetch(`${baseUrl}/logout`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        return await response.json();
    },

    async register(user) {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return await response.json();
    },
}