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
        const result = await response.json();
        return Array.isArray(result) ? result : []; // Ensure the result is always an array
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

export const useUpdateEmployee = () => { // Remove id from the hook
    const { accessToken } = useContext(UserContext);

    const update = async (id, employee) => { // Accept id and employee as parameters
        const response = await fetch(`${baseUrl}/${id}`, { // Use id dynamically
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(employee) // Send employee data to the server
        });

        if (!response.ok) {
            throw new Error(`Failed to update employee with id ${id}: ${response.statusText}`);
        }

        return await response.json(); // Return the updated employee data
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
    const { employees } = useEmployees();

    const employeesByProjectId = async () => {
        const data = await employees(); // Fetch all employees
        return data.filter(e => e.currentProject === projectId); // Filter employees by projectId
        };    

    return { employeesByProjectId };
};

export const useEmployeesWereOnProject = (projectId) => {
    const { employees } = useEmployees();

    const employeesWereOnProject = async () => {
        const data = await employees(); // Fetch all employees
        return data.filter(e => e.previousProjects.includes(projectId)); // Filter employees who were on the project
    };    

    return { employeesWereOnProject };
};

export const useSetEmployeeOnProject = (employeeId, projectId) => {
    const { employee: currentEmployee } = useEmployee();
    const { update } = useUpdateEmployee();

    const setEmployeeOnProject = async () => {
        const employee = await currentEmployee(employeeId);
        employee.previousProjects = employee.previousProjects || []; // Ensure previousProjects is an array

        await update(employeeId, { ...employee, currentProject: projectId });
        return employee; // Return the updated employee object
    }

    return { setEmployeeOnProject };
};

export const useSetEmployeeFree = (employeeId) => {
    const { employee: currentEmployee } = useEmployee();
    const { update } = useUpdateEmployee();

    const setEmployeeFree = async () => {
        const employee = await currentEmployee(employeeId);
        employee.previousProjects = employee.previousProjects || []; // Ensure previousProjects is an array

        await update(employeeId, { ...employee, currentProject: "" });
        return employee; // Return the updated employee object
    }

    return { setEmployeeFree };
};

