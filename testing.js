// Get references to the elements with n-country attributes
const nigeriaElements = document.querySelectorAll('[n-country="nigeria"]');
const indiaElements = document.querySelectorAll('[n-country="india"]');
const uaeElements = document.querySelectorAll('[n-country="uae"]');

// Use the Geolocation API to get the user's location
navigator.geolocation.getCurrentPosition(position => {
  // Get the latitude and longitude of the user's location
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Use the Mapbox Geocoding API to get the city/country based on the latitude and longitude
  const mapboxAPIKey = 'pk.eyJ1IjoibGFzZSIsImEiOiJja2w4czNlZGgwaXV4MndydjFhOWh6cWMwIn0.7Wj3qbGlNQ7ZR-vpBK_yIA';
  const mapboxAPIUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxAPIKey}`;

  fetch(mapboxAPIUrl)
    .then(response => response.json())
    .then(data => {
      // Check if the user is in Nigeria
      const isInNigeria = data.features.some(feature => {
        return feature.place_type.includes('country') && feature.text.toLowerCase() === "nigeria";
      });
      // Set the display property of the Nigeria elements based on whether the user is in Nigeria or not
      nigeriaElements.forEach(element => {
        element.style.display = isInNigeria ? 'flex' : 'none';
      });

      // Check if the user is in India
      const isInIndia = data.features.some(feature => {
        return feature.place_type.includes('country') && feature.text.toLowerCase() === "india";
      });
      // Set the display property of the India elements based on whether the user is in India or not
      indiaElements.forEach(element => {
        element.style.display = isInIndia ? 'flex' : 'none';
      });

      // Check if the user is in the UAE
      const isInUAE = data.features.some(feature => {
        return feature.place_type.includes('country') && feature.text.toLowerCase() === "united arab emirates";
      });
      // Set the display property of the UAE elements based on whether the user is in the UAE or not
      uaeElements.forEach(element => {
        element.style.display = isInUAE ? 'flex' : 'none';
      });
    });
}, error => {
  // Handle geolocation errors
  console.error(error);
});
