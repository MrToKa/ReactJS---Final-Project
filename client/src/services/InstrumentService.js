const baseUrl = 'http://localhost:3030/jsonstore/instruments';

export default {
    async getAll() {
        const response = await fetch(baseUrl);
        const instruments = await response.json();
        return Object.values(instruments);
    },

    async getById(id) {
        const response = await fetch(`${baseUrl}/${id}`);
        return await response.json();
    },

    async create(instrument) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instrument)
        });
        return await response.json();
    },

    async update(id, instrument) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instrument)
        });
        return await response.json();
    },

    delete(id) {
        return fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
    },

    async getFreeInstruments() {
        const response = await this.getAll();
        return response.filter(i => i.currentOwner === "");
    },

    async getOccupiedInstruments() {
        const response = await this.getAll();
        return response.filter(i => i.currentOwner !== "");
    }
};