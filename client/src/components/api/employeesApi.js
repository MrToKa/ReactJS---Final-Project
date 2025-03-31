import { useContext } from 'react';

const baseUrl = 'http://localhost:3030/data/employees';

import { UserContext } from '../contexts/userContext.js';

export const useEmployees = () => {
    const { accessToken } = useContext(UserContext);

    const employees = async () => {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });
        return await response.json();
    };

    return { employees };
};

export const useEmployee = () => {
    const { accessToken } = useContext(UserContext);

    const employee = async (id) => { // Accept id as a parameter
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });
        return await response.json();
    };

    return { employee };
};

export const useCreateEmployee = () => {
    const { accessToken } = useContext(UserContext);

    const create = async (employee) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(employee)
        });
        return await response.json();
    };

    return { create };
}

export const useUpdateEmployee = (id) => {
    const { accessToken } = useContext(UserContext);

    const update = async (employee) => {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(employee)
        });
        return await response.json();
    };

    return { update };
}

export const useDeleteEmployee = (id) => {
    const { accessToken } = useContext(UserContext);

    const deleteEmployee = async () => {
        await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });
    };

    return { deleteEmployee };
}

export const useFreeEmployees = () => {
    const { employees } = useEmployees();

    const freeEmployees = async () => {
        const data = await employees();
        return data.filter(e => e.currentProject === "");
    };

    return { freeEmployees };
};

export const useEmployeesOnProjects = () => {
    const { employees } = useEmployees();

    const fetchEmployeesOnProjects = async () => {
        const data = await employees(); // Fetch all employees
        return data.filter(e => e.currentProject !== ""); // Filter employees on projects
    };

    return { fetchEmployeesOnProjects }; // Return the function
};

export const useEmployeesByProjectId = (projectId) => {
    const employeesByProjectId = async () => {
        this.employees().then((data) => {
            return data.filter(e => e.currentProject === projectId);
        });
    }

    return { employeesByProjectId };
};

export const useEmployeesWereOnProject = (projectId) => {
    const employeesWereOnProject = async () => {
        this.employees().then((data) => {
            return data.filter(e => e.previousProjects && e.previousProjects.includes(projectId));
        });
    }

    return { employeesWereOnProject };
};

export const useSetEmployeeOnProject = (employeeId, projectId) => {
    const setEmployeeOnProject = async () => {
        const employee = await this.employee(employeeId);
        employee.currentProject = projectId;
        return this.update(employeeId, employee);
    }

    return { setEmployeeOnProject };
};

export const useSetEmployeeFree = (employeeId) => {
    const setEmployeeFree = async () => {
        const employee = await this.employee(employeeId);
        employee.previousProjects.push(employee.currentProject);
        employee.currentProject = "";
        return this.update(employeeId, employee);
    }

    return { setEmployeeFree };
};

//setInstrumentToEmployee
//returnInstrumentFromEmployee
