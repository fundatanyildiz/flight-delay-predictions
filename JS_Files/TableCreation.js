// Fetch the JSON file and dynamically generate the table
    const data = JSON.parse(localStorage.getItem("graphData"));
    //Month data is in string format but in graphs it needs in 
    //numbers so before processing convert month value into number
    const monthNumber = getMonthNumber(data.month);
    const prefixForAccurateFilghts = `../monthly_summary/${data.arrival}_${data.departure}_${monthNumber}`;
    function processSecondScript(tableObj,tableContainer) 
    {
        const table = tableObj.innerText;
    }
    //tableContainer.style.display = "none";
       fetch(`${prefixForAccurateFilghts}_top5_airlines.json`) // Update path if the file is hosted elsewhere
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(jsonData => {
       
        //table.style.display = "block";

        const tableBody = table.querySelector('tbody');
       // Convert JSON data into an array of objects for easier processing
        const rowData = Object.keys(jsonData.Airline).map(key => ({
          Airline: jsonData.Airline[key],
          Total_Flight: jsonData.Total_Flight[key],
          Average_Dep_Delay: jsonData.Average_Dep_Delay[key],
          Average_Arr_Delay: jsonData.Average_Arr_Delay[key],
          On_Time_Percentage: jsonData.On_Time_Percentage[key]
        }));

        // Populate the table
        rowData.forEach(row => {
        const tr = document.createElement('tr');
          console.log(tr);
          // Create cells for each column
          Object.values(row).forEach(cellData => {
          const td = document.createElement('td');
           td.textContent = cellData;
            tr.appendChild(td);
          });

          // Add the row to the table body
          tableBody.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Error fetching or parsing the JSON file:', error);
      });
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
  
