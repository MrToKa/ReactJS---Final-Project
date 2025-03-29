const baseUrl = 'http://localhost:3030/jsonstore/employees';

import InstrumentService from './InstrumentService.js';

export default {
    async getAll() {
        const response = await fetch(baseUrl);
        const employees = await response.json();
        return Object.values(employees);
    },

    async getById(id) {
        const response = await fetch(`${baseUrl}/${id}`);
        return await response.json();
    },

    async create(employee) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });
        return await response.json();
    },

    async update(id, employee) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });
        return await response.json();
    },
    delete(id) {
        return fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
    },

    async getFreeEmployees() {
        const response = await this.getAll();
        return response.filter(e => e.currentProject === "");
    },

    async getEmployeesOnProjects() {
        const response = await this.getAll();
        return response.filter(e => e.currentProject !== "");
    },

    async getEmployeesByProjectId(projectId) {
        const response = await this.getAll();
        return response.filter(e => e.currentProject === projectId);
    },

    async getEmployeesWereOnProject(projectId) {
        const response = await this.getAll();
        return response.filter(e => e.previousProjects && e.previousProjects.includes(projectId));
    },

    async setEmployeeOnProject(employeeId, projectId) {
        const employee = await this.getById(employeeId);
        employee.currentProject = projectId;
        return this.update(employeeId, employee);
    },

    async setEmployeeFree(employeeId) {
        const employee = await this.getById(employeeId);
        employee.previousProjects.push(employee.currentProject);
        employee.currentProject = "";
        return this.update(employeeId, employee);
    },

    async setInstrumentToEmployee(employeeId, instrumentId) {
        const employee = await this.getById(employeeId);
        employee.instruments.push(instrumentId);
        const instrument = await InstrumentService.getById(instrumentId);
        instrument.currentOwner = employeeId;
        await InstrumentService.update(instrumentId, instrument);
        await this.update(employeeId, employee);
    },

    async returnInstrumentFromEmployee(employeeId, instrumentId) {
        const employee = await this.getById(employeeId);
        if (employee.instruments && employee.instruments.includes(instrumentId)) {
            employee.instruments = employee.instruments.filter(id => id !== instrumentId);
        } 
        const instrument = await InstrumentService.getById(instrumentId);
        instrument.currentOwner = "";
        await InstrumentService.update(instrumentId, instrument); 
        return this.update(employeeId, employee);
    }
};
