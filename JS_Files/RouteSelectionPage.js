 // Dynamically load the month dropdown
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("month");

    // Fetch and include the monthDropdown.html content
    fetch("month.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load month.html");
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html; // Insert the dropdown into the container
            })
        .catch(error => {
            console.error("Error loading the month dropdown:", error);
            container.innerHTML = "<p>Failed to load month selector. Please try again.</p>";
        });
       
});
    
document.addEventListener("DOMContentLoaded", () => {
    const arrivalDropdown = document.getElementById("arrival");
    const departureDropdown = document.getElementById("departure");

    // Fetch JSON data
    fetch("../JSON_Files/Airports.json")
        .then(response => response.json())
        .then(data => {
            // Sort airports alphabetically by city
            data.sort((a, b) => a.city.localeCompare(b.city));

            // Populate dropdowns
            populateDropdown(arrivalDropdown, data);
            populateDropdown(departureDropdown, data);
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

        


function populateDropdown(dropdown, data) {
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = `${item.city} - ${item.name}`;
        dropdown.appendChild(option);
    });
}


function submitFlightSelection() 
{
    // Get selected values from dropdowns
    const arrival = document.getElementById("arrival").value;
    const departure = document.getElementById("departure").value;
    const monthDropdown = document.getElementById("monthDropdown");
    //const dateStr = document.getElementById('month').value;
    const month  = monthDropdown.value;
    //COnvert value into number

    // Log selected values for debugging
    console.log('Arrival:', arrival);
    console.log('Departure:', departure);
    console.log('selected Month:',month);
    //const month = parseInt(dateStr.split("-")[1], 10);
 
    // Redirect to the new page after successful submission
    const data = { arrival: arrival, departure: departure, month: month };
    localStorage.setItem("graphData", JSON.stringify(data));
    window.location.href = "RoutePredictionGraphNew.html";
}
const message = document.getElementById("message");
document.getElementById('submitBtn').addEventListener('click', (event) => 
{
    event.preventDefault(); // Prevent default form submission behavior
     submitFlightSelection();
});
   

