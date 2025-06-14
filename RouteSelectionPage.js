document.addEventListener("DOMContentLoaded", () => {
    const arrivalDropdown = document.getElementById("arrival");
    const departureDropdown = document.getElementById("departure");

    // Fetch JSON data
    fetch("Airports.json")
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
        option.value = item.name;
        option.textContent = `${item.city} - ${item.name}`;
        dropdown.appendChild(option);
    });
}

function submitFlightSelection() 
{
    // Get selected values from dropdowns
    const arrival = document.getElementById("arrival").value;
    const departure = document.getElementById("departure").value;
    const month = document.getElementById('month').value;
    // Log selected values for debugging
    console.log('Arrival:', arrival);
    console.log('Departure:', departure);
    console.log('selected Month:',month);
   
 // Redirect to the new page after successful submission
            window.location.href = "RoutePredictionGraph.html";
    // Send the data to the backend
    /*fetch('https://backend-api.com/submit', 
        {
            method: 'POST', // HTTP method
            headers: {
            'Content-Type': 'application/json' // Inform the backend of JSON content
            },
        body: JSON.stringify({ arrival, destination , month}) // Convert the data to JSON
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });*/
}
// Function to check dropdown values
function validateSelections() 
{
     const arrival = document.getElementById("arrival").value;
    const departure = document.getElementById("departure").value;
     const month = document.getElementById('month').value;
    const submitBtn = document.getElementById("submitBtn");
    const message = document.getElementById("message");

   
        if ((arrival && departure && month) 
            && (arrival!=" " && departure!=" " && month!=" "))
            {
            // Both dropdowns have valid selections
            submitBtn.disabled = false;
            message.style.display = "none"; // Hide the message
            } 
           else 
            {
                // At least one dropdown is not selected
                submitBtn.disabled = true;
                message.style.display = "block"; // Show the message
            }     
   

}
document.getElementById("arrival").addEventListener("change", validateSelections);
document.getElementById("departure").addEventListener("change", validateSelections);
document.getElementById("month").addEventListener("change", validateSelections);
// Attach the function to the button click event
    document.getElementById('submitBtn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission behavior
   // document.getElementById("arrival").addEventListener("change", validateSelections);
    //document.getElementById("departure").addEventListener("change", validateSelections);
    //validateSelections();
   submitFlightSelection();
    });


