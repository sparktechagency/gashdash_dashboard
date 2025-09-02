export async function getLocationFromCoordinates(lat, lon) {
  const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      // Extract the location name from the response
      const location = data.results[0].formatted_address;
      return location;
    } else {
      throw new Error('Unable to retrieve location');
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  }
}
