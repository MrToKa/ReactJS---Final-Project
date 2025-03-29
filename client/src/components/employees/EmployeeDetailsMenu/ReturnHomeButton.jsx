

export default function ReturnHomeButton() {
    const handleReturnHome = () => {
        // Logic to return to the home page
        console.log("Returning to home page");
        // Redirect to home page (assuming you have a function for this)
        window.location.href = "/";
    };

    return (
        <button onClick={handleReturnHome}>
            Return Home
        </button>
    );
}