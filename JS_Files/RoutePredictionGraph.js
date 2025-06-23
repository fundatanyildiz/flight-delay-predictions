   let str = "";
   document.addEventListener("DOMContentLoaded", function () {
      const data = JSON.parse(localStorage.getItem("graphData"));
   
    const errorMessageElement = document.getElementById("error-message");
     errorMessageElement.style.display = "none";
    let emptyFieldArray= [];
      console.log(data)
      try {
            if( !data ||
            (data.arrival === null || data.arrival === undefined || typeof data.arrival === "string" && data.arrival.trim() === "") ||
            (data.departure === null || data.departure === undefined || typeof data.departure === "string" && data.departure.trim() === "") ||
            (data.month === null || data.month === undefined))
            {
                if (data.arrival === null || data.arrival === undefined 
                    || (typeof data.arrival === "string" && data.arrival.trim() === ""))
                {
                emptyFieldArray.push("arrival field")
                
                }
                if(data.departure === null || data.departure === undefined 
                    ||(typeof data.departure === "string" && data.departure.trim() === ""))
                {
                emptyFieldArray.push("departure field")
                    
                }
           
                (data.month === null || data.month === undefined)
                {
                emptyFieldArray.push("month field")
                    
                }
                throw new Error(`Error: Select data for  ${emptyFieldArray.join(", ")}.`);
            }
            else if(data.arrival !== data.departure)
            {
                errorMessageElement.style.display = "none";
                const prefix = `graphs/${data.arrival}_${data.departure}_${data.month}`;
                fetch(`${prefix}_traffic.json`)
                .then(response => response.json())
                .then(plotData => {
                if (plotData.data && plotData.data.length > 0) {
                    Plotly.newPlot('traffic', plotData.data, plotData.layout);
                }
                else
                {
                    throw new Error("Sorry There is no available data for this route.");
                }
                })
                //Old one
            // .catch(error => console.error("Failed to load traffic plot:", error));
            .catch(error => {
                const errorIcon = document.getElementById("errorIcon");
                errorIcon.src = "WarningImage.png"; // Replace with the new image path
                errorIcon.alt = "Updated Icon"; // Optionally update the alt text
                errorMessageElement.innerText = error.message; // Show the error message
                errorMessageElement.style.display = "block";
                });

            fetch(`${prefix}_arrival_delay.json`)
                .then(response => response.json())
                .then(plotData => {
                    if (plotData.data && plotData.data.length > 0) {
                    Plotly.newPlot('arrival_delay', plotData.data, plotData.layout);
                    } 
                })
                .catch(error =>
                    {console.error("Failed to load arrival delay plot:", error);});

            fetch(`${prefix}_departure_delay.json`)
                .then(response => response.json())
                .then(plotData => {
                    if (plotData.data && plotData.data.length > 0) {
                        Plotly.newPlot('departure_delay', plotData.data, plotData.layout);
                    } 
                })
                .catch(error => console.error("Failed to load departure delay plot:", error));
            }
            else
            {
                      throw new Error("Your selected arrival and destination airports are the same. Please choose different airports to proceed.");
                    //console.log("Your selected arrival and destination airports are the same. Please choose different airports to proceed.");
                      // Set a delay before navigating back
            }
        
    } catch (error) 
      {
        // Display the error message in the HTML element
        errorMessageElement.innerText = error.message;
        errorMessageElement.style.display = "block";
        // Set a delay before navigating back
            setTimeout(function () {
            history.back(); // Navigate back after 7 secs
            }, 7000); // 
      }


      //Old code
     /* if (!data || 
                (data.arrival === null || data.arrival === undefined || data.arrival.trim === "" )||
                (data.departure === null || data.departure === undefined || data.departure.trim === "") ||
                (data.month === null || data.month === undefined || data.month.trim === "") )
       {
            console.error("Invalid or missing graphData in localStorage.");
            alert("Please check your input and try again.");
            history.back();
            //return;
        } 
     const prefix = `graphs/${data.arrival}_${data.departure}_${data.month}`;

      fetch(`${prefix}_traffic.json`)
        .then(response => response.json())
        .then(plotData => {
        if (plotData.data && plotData.data.length > 0) {
            Plotly.newPlot('traffic', plotData.data, plotData.layout);
        }else{
            document.getElementById("warning").textContent = "There is no available data for this route.";
        }
        })
        .catch(error => console.error("Failed to load traffic plot:", error));

      fetch(`${prefix}_arrival_delay.json`)
        .then(response => response.json())
        .then(plotData => {
            if (plotData.data && plotData.data.length > 0) {
            Plotly.newPlot('arrival_delay', plotData.data, plotData.layout);
            } 
        })
        .catch(error => console.error("Failed to load arrival delay plot:", error));

      fetch(`${prefix}_departure_delay.json`)
        .then(response => response.json())
        .then(plotData => {
            if (plotData.data && plotData.data.length > 0) {
                Plotly.newPlot('departure_delay', plotData.data, plotData.layout);
            } 
        })
        .catch(error => console.error("Failed to load departure delay plot:", error));*/
        
    });