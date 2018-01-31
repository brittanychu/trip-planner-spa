const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiYnNjMjEyMCIsImEiOiJjamQxdW9pdzEyMzJqMnduMmplc21wYndzIn0.PK09Vx8tBp8VOS9tKWQEWQ";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

fetch('/api')
  .then(result => result.json())
  .then(data => {
    data[0].forEach((elem) => {
      const list = document.getElementById('hotels-choices');
      const option = document.createElement('option');
      option.text = elem.name;
      list.add(option);
    })
    
    data[1].forEach((elem) => {
      const list = document.getElementById('restaurants-choices');
      const option = document.createElement('option');
      option.text = elem.name;
      list.add(option);
    })

    data[2].forEach((elem) => {
      const list = document.getElementById('activities-choices');
      const option = document.createElement('option');
      option.text = elem.name;
      list.add(option);
    })
  })
  .catch(console.error);