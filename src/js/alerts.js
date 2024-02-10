// Function to load alerts from alerts.json
function loadAlerts(callback) {
    fetch("json/alerts.json")
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.error("Error loading alerts:", error);
        });
}

// Function to create alert elements and prepend to the main page
function createAlertElements(alerts) {
    const mainElement = document.querySelector("main");

    if (!alerts || !alerts.length) {
        console.warn("No alerts found.");
        return;
    }

    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    // Loop through alerts and create alert elements
    alerts.forEach((alert) => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertSection.appendChild(alertElement);
    });

    // Prepend alert section to main element
    mainElement.prepend(alertSection);
}

// Load alerts and create alert elements
loadAlerts(createAlertElements);
