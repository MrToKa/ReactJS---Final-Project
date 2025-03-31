import { useContext } from 'react';

const baseUrl = 'http://localhost:3030/data/employees';

import { UserContext } from '../contexts/userContext.js';

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