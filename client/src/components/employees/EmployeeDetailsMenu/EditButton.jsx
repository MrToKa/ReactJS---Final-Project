import React from 'react';
import { Button } from 'antd';

export default function EditButton({ employeeId, refreshEmployee }) {
    const handleEdit = () => {
        // Logic to edit the employee
        console.log(`Editing employee with ID: ${employeeId}`);
        // Call the refresh function to update the employee details
        refreshEmployee();
    };

    return (
        <button onClick={handleEdit}>
            Edit Employee
        </button>
    );
}