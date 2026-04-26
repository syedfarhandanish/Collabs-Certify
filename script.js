// This file handles the logic on the web page

document.getElementById('testBtn').addEventListener('click', async () => {
    const statusBox = document.getElementById('statusBox');
    statusBox.innerText = "Connecting to Python...";
    statusBox.style.backgroundColor = "#fff3cd"; // Yellow loading color

    try {
        // We call the API folder where Vercel hosts our Python file
        const response = await fetch('/api/index');
        const data = await response.json();

        // If successful, show the message from Python
        statusBox.innerText = data.message;
        statusBox.style.backgroundColor = "#d4edda"; // Green success color
        statusBox.style.color = "#155724";

    } catch (error) {
        // If it fails, show an error
        statusBox.innerText = "Error connecting to backend.";
        statusBox.style.backgroundColor = "#f8d7da"; // Red error color
        statusBox.style.color = "#721c24";
        console.error("Error:", error);
    }
});