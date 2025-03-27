export default function CreateEmployeeButton({ reloadEmployees, resetStyles }) {
    const handleClick = () => {
        // Logic to create a new employee
        // For example, you can open a modal or redirect to a form page
        console.log("Create Employee button clicked");
        reloadEmployees(); // Reload employees after creating a new one
        resetStyles(); // Reset styles after creating a new employee
    };

    return (
        <button onClick={handleClick} style={{ backgroundColor: "green" }}>
            Create Employee
        </button>
    );
}