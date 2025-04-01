import { useContext } from 'react';

const baseUrl = 'http://localhost:3030/data/instruments';

import { UserContext } from '../contexts/userContext.js';

export const useInstruments = () => {
    const { accessToken } = useContext(UserContext);

    const instruments = async () => {
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
            console.error("Error fetching instruments from API:", error); // Error handling
            return [];
        }
    }

    return { instruments };
};

export const useInstrument = () => {
    const { accessToken } = useContext(UserContext);

    const instrument = async (id) => { // Accept id as a parameter
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });
        return await response.json();
    };

    return { instrument };
};

export const useCreateInstrument = () => {
    const { accessToken } = useContext(UserContext);

    const createInstrument = async (instrument) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(instrument)
        });
        return await response.json();
    };

    return { createInstrument };
};

export const useUpdateInstrument = () => {
    const { accessToken } = useContext(UserContext);

    const update = async (id, instrument) => {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(instrument)
        });
        return await response.json();
    };

    return { update };
};

export const useDeleteInstrument = () => {
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
};

//getFreeInstruments
export const useGetFreeInstruments = async () => {
    const response = await this.instruments();
    const freeInstruments = response.filter(i => i.currentOwner === "");

    return { freeInstruments }; // Return the filtered data
};

//getOccupiedInstruments
export const useGetOccupiedInstruments = async () => {
    const response = await this.instruments();
    const occupiedInstruments = response.filter(i => i.currentOwner !== "");

    return { occupiedInstruments }; // Return the filtered data
}
