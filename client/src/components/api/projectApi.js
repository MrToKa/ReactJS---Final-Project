import { useContext } from 'react';

const baseUrl = 'http://localhost:3030/data/projects';

import { UserContext } from '../contexts/userContext.js';
import { useEmployees } from './employeesApi.js'; // Import the useEmployee hook

export const useProjects = () => {
    const projects = async () => {
        try {
            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching projects from API:", error); // Error handling
            return [];
        }
    };

    return { projects };
}

export const useProject = () => {
    const project = async (id) => {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    };

    return { project };
};

export const useCreateProject = () => {
    const { accessToken } = useContext(UserContext);

    const create = async (project) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    };

    return { create };
}

export const useUpdateProject = () => {
    const { accessToken } = useContext(UserContext);

    const update = async (id, project) => { // Use _id from the project object
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    };

    return { update };
}

export const useDeleteProject = () => {
    const { accessToken } = useContext(UserContext);

    const remove = async (id) => {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });
        return await response.json();
    };

    return { remove };
}

//getOngoingProjects
export const useOngoingProjects = () => {
    const { projects } = useProjects(); // Use the projects function from useProjects
    const ongoingProjects = async () => {
        const response = await projects(); // Call the projects function to get all projects
        return response.filter(project => project.status === 'Ongoing'); // Filter ongoing projects
    };

    return { ongoingProjects };
};

//getCompletedProjects
export const useCompletedProjects = () => {
    const { projects } = useProjects(); // Use the projects function from useProjects
    const completedProjects = async () => {
        const response = await projects(); // Call the projects function to get all projects
        return response.filter(project => project.status === 'Completed'); // Filter completed projects
    };

    return { completedProjects };
};

//getFutureProjects
export const useFutureProjects = () => {
    const { projects } = useProjects(); // Use the projects function from useProjects
    const futureProjects = async () => {
        const response = await projects(); // Call the projects function to get all projects
        return response.filter(project => project.status === 'Future'); // Filter future projects
    };

    return { futureProjects };
};

export const useEmployeesCurrentlyOnProject = () => {
    const { project } = useProject(); // Use the project function from useProject
    const { employees } = useEmployees(); // Use the employees function from useEmployees

    const employeesCurrentlyOnProject = async (projectId) => {
        const projectData = await project(projectId); // Get project data
        const allEmployees = await employees(); // Get all employees
        return allEmployees.filter(employee => employee.currentProject === projectData._id); // Filter employees on the project
    }

    return { employeesCurrentlyOnProject };
};

export const useEmployeesPreviouslyOnProject = () => {
    const { project } = useProject(); // Use the project function from useProject
    const { employees } = useEmployees(); // Use the employees function from useEmployees

    const employeesPreviouslyOnProject = async (projectId) => {
        const projectData = await project(projectId); // Get project data
        const allEmployees = await employees(); // Get all employees
        return allEmployees.filter(
            (employee) =>
              Array.isArray(employee.previousProjects) &&
              employee.previousProjects.includes(projectData._id)
          );
          
    }

    return { employeesPreviouslyOnProject };
};

