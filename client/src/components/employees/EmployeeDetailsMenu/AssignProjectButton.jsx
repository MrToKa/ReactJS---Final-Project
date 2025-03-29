

export default function AssignProjectButton({ employeeId, refreshEmployee }) {
    const handleAssignProject = () => {
        // Logic to assign a project to the employee
        console.log(`Assigning project to employee with ID: ${employeeId}`);
        // Call the refresh function to update the employee details
        refreshEmployee();
    };

    return (
        <button onClick={handleAssignProject}>
            Assign Project
        </button>
    );
}