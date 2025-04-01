import { useContext } from 'react';

const baseUrl = 'http://localhost:3030/data/projects';

import { UserContext } from '../contexts/userContext.js';

export const useProjects = () => {
    const { accessToken } = useContext(UserContext);

    const projects = async () => {
        try {
            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Authorization': accessToken,
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
    const { accessToken } = useContext(UserContext);

    const project = async (id) => { // Accept id as a parameter
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
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

export const useUpdateProject = () => { // Removed id parameter
    const { accessToken } = useContext(UserContext);

    const update = async (project) => { // Use _id from the project object
        const response = await fetch(`${baseUrl}/${project._id}`, {
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
    const { accessToken } = useContext(UserContext);

    const ongoingProjects = async () => {
        const response = await this.projects(); // Call the projects function to get all projects
        return response.filter(project => project.status === 'ongoing'); // Filter ongoing projects

    };

    return { ongoingProjects };
}
//getCompletedProjects
export const useCompletedProjects = () => {
    const { accessToken } = useContext(UserContext);

    const completedProjects = async () => {
        const response = await this.projects(); // Call the projects function to get all projects
        return response.filter(project => project.status === 'completed'); // Filter completed projects
    };

    return { completedProjects };
}
//getFutureProjects
export const useFutureProjects = () => {
    const { accessToken } = useContext(UserContext);

    const futureProjects = async () => {
        const response = await this.projects(); // Call the projects function to get all projects
        return response.filter(project => project.status === 'future'); // Filter future projects
    };

    return { futureProjects };
}