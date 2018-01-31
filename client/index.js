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

// const marker = buildMarker("activities", fullstackCoords);
// marker.addTo(map);

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

const hotelButton = document.getElementById('hotels-add');
hotelButton.addEventListener('click', function(){
  // const options = document.getElementById('hotels-choices').options
  // console.log(options[options.selectedIndex].text)

  // Get the select dom element
  const select = document.getElementById(`hotels-choices`);
  // use `.value` to get the currently selected value
  const selectedName = select.value;
  
  const itineraryItem = document.createElement('li');
  itineraryItem.append(selectedName);
  document.getElementById('hotels-list').append(itineraryItem);

  fetch(`/api/hotel/${selectedName}`)
    .then( (result) => result.json())
    .then( (hotel) => {
      return buildMarker('hotels', hotel.place.location)
    })
    .then( (marker) => {
      marker.addTo(map);
    });
});

const restaurantButton = document.getElementById('restaurants-add');
restaurantButton.addEventListener('click', function(){
  const select = document.getElementById('restaurants-choices');
  const selectedName = select.value;
  
  const itineraryItem = document.createElement('li');
  itineraryItem.append(selectedName);
  document.getElementById('restaurants-list').append(itineraryItem);

  fetch(`/api/restaurant/${selectedName}`)
    .then( (result) => result.json())
    .then( (restaurant) => {
      return buildMarker('restaurants', restaurant.place.location)
    })
    .then( (marker) => {
      marker.addTo(map);
    });
});

const activityButton = document.getElementById('activities-add');
activityButton.addEventListener('click', function(){
  const select = document.getElementById('activities-choices');
  const selectedName = select.value;
  
  const itineraryItem = document.createElement('li');
  itineraryItem.append(selectedName);
  document.getElementById('activities-list').append(itineraryItem);

  fetch(`/api/activity/${selectedName}`)
    .then( (result) => result.json())
    .then( (activity) => {
      return buildMarker('activities', activity.place.location)
    })
    .then( (marker) => {
      marker.addTo(map);
    });
});