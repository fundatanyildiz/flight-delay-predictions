fetch('http://localhost:8080/Desktop/PrachiDocs/Flight_Prediction/newplot.png')
    .then(response => response.blob())
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        document.getElementById('image-display').src = imageUrl;
    })
    .catch(error => {
        console.error('Error fetching the image:', error);
    });