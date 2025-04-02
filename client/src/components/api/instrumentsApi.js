import { useContext } from 'react';

const baseUrl = 'http://localhost:3030/data/instruments';

import { UserContext } from '../contexts/userContext.js';
import { useEmployee } from './employeesApi.js'; // Import the useEmployee hook
import { useUpdateEmployee } from './employeesApi.js'; // Import the useUpdateEmployee hook

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
export const useGetFreeInstruments = () => {
    const { instruments } = useInstruments();

    const freeInstruments = async () => {
        try {
            const data = await instruments(); // Fetch all instruments      
            return data.filter((i) => i.currentOwner === ""); // Filter instruments by employeeId
        } catch (error) {
            console.error("Error fetching free instruments:", error);
            return [];
        }
    };

    return { freeInstruments };
    
};

//getOccupiedInstruments
export const useGetOccupiedInstruments = () => {
    const { instruments } = useInstruments();

    const occupiedInstruments = async () => {
        try {
            const data = await instruments(); // Fetch all instruments      
            return data.filter((i) => i.currentOwner !== ""); // Filter instruments by employeeId
        } catch (error) {
            console.error("Error fetching occupied instruments:", error);
            return [];
        }
    };

    return { occupiedInstruments };
}

//getInstrumentsByEmployeeId
export const useGetInstrumentsByEmployeeId = () => {
    const { instruments } = useInstruments();

    const getInstrumentsByEmployeeId = async (employeeId) => {
        try {
            const data = await instruments(); // Fetch all instruments        
            const instrumentsList = Array.isArray(data) ? data : Object.values(data); // Ensure data is an array
            const filteredInstruments = instrumentsList.filter((i) => i.currentOwner === employeeId); // Filter instruments by employeeId

            if (filteredInstruments.length === 0) {
                return []; // Return empty array if no instruments found
            }

            return Array.isArray(filteredInstruments) ? filteredInstruments : Object.values(filteredInstruments); // Ensure the result is an array
        } catch (error) {
            console.error("Error fetching instruments by employee ID:", error); // Error handling
            return []; // Return empty array on error
        }
    };

    return { getInstrumentsByEmployeeId };
};

//setInstrumentToEmployee
export const useSetInstrumentToEmployee = () => {
    const { employee: currentEmployee } = useEmployee();
    const { instrument: currentInstrument } = useInstrument();
    const { update: updateEmployee } = useUpdateEmployee();
    const { update: updateInstrument } = useUpdateInstrument();

    const setInstrumentToEmployee = async (employeeId, instrumentId) => {
        const employee = await currentEmployee(employeeId);
        const instrument = await currentInstrument(instrumentId);

        instrument.currentOwner = employeeId; // Set the current owner to the employee ID
        employee.instruments.push(instrumentId); // Add the instrument ID to the employee's instruments array

        await updateInstrument(instrumentId, instrument); // Update the instrument in the database
        await updateEmployee(employeeId, employee); // Update the employee in the database
    };

    return { setInstrumentToEmployee };
};

//returnInstrumentFromEmployee
export const useReturnInstrumentFromEmployee = () => {
    const { employee: currentEmployee } = useEmployee();
    const { instrument: currentInstrument } = useInstrument();
    const { update: updateEmployee } = useUpdateEmployee();
    const { update: updateInstrument } = useUpdateInstrument();

    const returnInstrumentFromEmployee = async (employeeId, instrumentId) => {
        const employee = await currentEmployee(employeeId);
        const instrument = await currentInstrument(instrumentId);

        instrument.currentOwner = ""; // Set the current owner to the employee ID
        employee.instruments = employee.instruments.filter(i => i !== instrumentId); // Remove the instrument ID from the employee's instruments array

        await updateInstrument(instrumentId, instrument) // Update the instrument in the database
        await updateEmployee(employeeId, employee) // Update the employee in the database 
    }

    return { returnInstrumentFromEmployee };
};