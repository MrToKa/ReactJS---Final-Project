export default function EmployeesOnProjectsButton({
    setEmployees,
    isOnProjectsActive,
    setIsOnProjectsActive,
    resetStyles,
}) {
    const handleClick = () => {
        // Fetch employees on projects from the API
        fetch("https://fakestoreapi.com/users")
            .then((response) => response.json())
            .then((data) => {
                const employeesOnProjects = data.filter((user) => user.onProject); // Assuming 'onProject' is a property indicating if the employee is on a project
                setEmployees(employeesOnProjects);
                resetStyles(); // Reset styles after fetching
                setIsOnProjectsActive(true); // Set the active state for "employees on projects"
            });
    };

    return (
        <button onClick={handleClick} style={{ backgroundColor: isOnProjectsActive ? "blue" : "gray" }}>
            Employees on Projects
        </button>
    );
}