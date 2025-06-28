// Fetch the JSON file and dynamically generate the table
    fetch('../monthly_summary/ORD_LAS_1_top5_airlines.json') // Update path if the file is hosted elsewhere
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(jsonData => {
        const tableDisplay = document.getElementById("table");
        tableDisplay.style.display = "block";
        const tableBody = document.querySelector('#table tbody');

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
  
