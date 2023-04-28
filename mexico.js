// Get a reference to the element(s) with n-country="mexico"
const countryElements = document.querySelectorAll('[n-country="mexico"]');

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
      // Check if the user is in Mexico
      const isInMexico = data.features.some(feature => {
        return feature.place_type.includes('country') && feature.text.toLowerCase() === "mexico";
      });

      // Set the display property of the elements based on whether the user is in Mexico or not
      countryElements.forEach(element => {
        element.style.display = isInMexico ? 'flex' : 'none';
      });
    });
}, error => {
  // Handle geolocation errors
  console.error(error);
});    
