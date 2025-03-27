export default function FreeEmployeesButton({
    setEmployees,
    isFreeActive,
    setIsFreeActive,
    resetStyles,
    }) {
    const handleClick = () => {
        // Fetch free employees from the API
        fetch("https://fakestoreapi.com/users")
        .then((response) => response.json())
        .then((data) => {
            const freeEmployees = data.filter((user) => user.free); // Assuming 'free' is a property indicating if the employee is free
            setEmployees(freeEmployees);
            resetStyles(); // Reset styles after fetching
            setIsFreeActive(true); // Set the active state for "free employees"
        });
    };
    
    return (
        <button onClick={handleClick} style={{ backgroundColor: isFreeActive ? "blue" : "gray" }}>
        Free Employees
        </button>
    );
    }