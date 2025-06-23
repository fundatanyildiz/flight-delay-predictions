document.addEventListener("DOMContentLoaded", async function () {
    const data = JSON.parse(localStorage.getItem("graphData"));
    const errorMessageElement = document.getElementById("error-message");
    const errorIcon = document.getElementById("errorIcon");

    // Ensure UI elements exist
    if (!errorMessageElement || !errorIcon) {
        console.error("Error UI elements not found");
        return;
    }

    // Hide error UI initially
    errorMessageElement.style.display = "none";
    errorIcon.style.display = "none";

    try {
        const emptyFieldArray = [];
        //
        const isEmpty = val => val == null || (typeof val === "string" && val.trim() === "");

        if (!data || isEmpty(data.arrival) || isEmpty(data.departure) || data.month == null) 
        {
            //Used optional chaining (data?.field) to avoid crashing if data is null. 
            if (isEmpty(data?.arrival)) emptyFieldArray.push("arrival field");
            if (isEmpty(data?.departure)) emptyFieldArray.push("departure field");
            if (data?.month == null) emptyFieldArray.push("month field");

            throw new Error(`Please provide data for ${emptyFieldArray.join(", ")}.`);
        }

        if (data.arrival === data.departure) {
            throw new Error("Arrival and departure airports cannot be the same. Please select different airports.");
        }

        const prefix = `../graphs/${data.arrival}_${data.departure}_${data.month}`;

        await fetchAndPlot(`${prefix}_traffic.json`, 'traffic', 'No available traffic data for the selected route.');
        await fetchAndPlot(`${prefix}_arrival_delay.json`, 'arrival_delay', 'No available arrival delay data for the selected route.');
        await fetchAndPlot(`${prefix}_departure_delay.json`, 'departure_delay', 'No available departure delay data for the selected route.');

    } catch (error) {
        handleCustomError(error.message, errorMessageElement, errorIcon);
        setTimeout(() => history.back(), 5000);
    }
});

async function fetchAndPlot(url, elementId, errorMsg) {
    try {
        const response = await fetch(url);
        const plotData = await response.json();
        if (plotData.data?.length > 0) {
            Plotly.newPlot(elementId, plotData.data, plotData.layout);
        } else {
            throw new Error(errorMsg);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

function handleCustomError(errorMessage, errorMessageElement, errorIcon) {
    console.error(errorMessage);
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.style.display = "block";
    errorIcon.style.display = "block";
}
