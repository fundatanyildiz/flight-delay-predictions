document.addEventListener("DOMContentLoaded", async function () {
    const data = JSON.parse(localStorage.getItem("graphData"));
    const errorMessageElement = document.getElementById("error-message");
    const errorIcon = document.getElementById("errorIcon");
    
    // Check UI elements exist
    if (!errorMessageElement || !errorIcon) {
        console.error("Error UI elements not found");
        return;
    }

    // Hide error UI initially
    errorMessageElement.style.display = "none";
    errorIcon.style.display = "none";

    try {
        const emptyFieldArray = [];
       
        const isEmpty = val => val == null || (typeof val === "string" && val.trim() === "");
        
        if (!data || isEmpty(data.arrival) || isEmpty(data.departure) || isEmpty(data.month)) 
        {
            //Used optional chaining (data?.field) to avoid crashing if data is null. 
            if (isEmpty(data?.arrival)) emptyFieldArray.push("arrival field");
            if (isEmpty(data?.departure)) emptyFieldArray.push("departure field");
            //if (data?.month == null) emptyFieldArray.push("month field");
              if (isEmpty(data?.month)) emptyFieldArray.push("month field");
            throw new Error(`Please provide data for ${emptyFieldArray.join(", ")}.`);
        }

        if (data.arrival === data.departure) {
            throw new Error("Arrival and departure airports cannot be the same. Please select different airports.");
        }
        //Month data is in string format but in graphs it needs in 
        //numbers so before processing convert month value into number
        const monthNumber = getMonthNumber(data.month);
        const prefix = `../graphs/${data.arrival}_${data.departure}_${monthNumber}`;
         const prefixForAccurateFilghts = `../monthly_summary/${data.arrival}_${data.departure}_${monthNumber}`;
        //Display data table.
        await fetchMostAccurateFlights(`${prefixForAccurateFilghts}_top5_airlines.json`,'No data for the selected route.');
        //Generate graph
        await fetchAndPlot(`${prefix}_traffic.json`, 'traffic', 'No available traffic data for the selected route.');
        await fetchAndPlot(`${prefix}_arrival_delay.json`, 'arrival_delay', 'No available arrival delay data for the selected route.');
        await fetchAndPlot(`${prefix}_departure_delay.json`, 'departure_delay', 'No available departure delay data for the selected route.');

    } catch (error) {
        handleCustomError(error.message, errorMessageElement, errorIcon);
        setTimeout(() => history.back(), 5000);
    }
});

async function fetchMostAccurateFlights(url,errorMsg) {
     
      const module = await import('../JS_Files/TableCreation.js'); // Dynamic import
      //console.log(module.JSON);
      
    
}
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
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.style.display = "block";
    errorIcon.style.display = "block";
}

//This function returns month name in the form of number value
function getMonthNumber(monthName) {
    // Object mapping month names to numbers
    const monthMap = {
        "January": 1, "February": 2, "March": 3, "April": 4,
        "May": 5, "June": 6, "July": 7, "August": 8,
        "September": 9, "October": 10, "November": 11, "December": 12
    };

    // Return the corresponding number
    const monthNumber = monthMap[monthName];
    return monthNumber;
}
