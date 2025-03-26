const baseUrl = 'http://localhost:3030/jsonstore/projects';

export default {
    async getAll() {
        const response = await fetch(baseUrl);
        const projects = await response.json();
        return Object.values(projects);
    },

    async getById(id) {
        const response = await fetch(`${baseUrl}/${id}`);
        return await response.json();
    },

    async create(project) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        return await response.json();
    },

    async update(id, project) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        return await response.json();
    },
    
    async delete(id) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },

    async getOngoingProjects() {
        const response = await this.getAll();
        return response.filter(p => p.status === 'ongoing');
    },

    async getCompletedProjects() {
        const response = await this.getAll();
        return response.filter(p => p.status === 'completed');
    },

    async getFutureProjects() {
        const response = await this.getAll();
        return response.filter(p => p.status === 'future');
    }    
};
