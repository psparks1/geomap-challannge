






var geojsonURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(geojsonURL).then(function(data) {
  console.log(data);
  createFeatures(data.features);
  console.log(data.features);
  
});


function chooseOpac(depth) {
  depth/100
};

function chooseRad(mag){
rad=mag*5

};


function createCircleMarker(point ){
  // Change the values of these options to change the symbol's appearance
  let options = {
    radius: chooseRad(point.properties.mag),
    fillColor: "red",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: chooseOpac(point.geometry.coordinates[2])
  }
  return L.circleMarker( point.geometry.coordinates[1], point.geometry.coordinates[0] , options );
};


function createFeatures(earthquakeData) {
  

  var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: createCircleMarker
  });
  
  
}

var overlayMaps = {
  Earthquakes: earthquakes
};

var myMap = L.map("map", {
  center: [ 37.09, -95.71 ],
  zoom: 5,
  layers: [earthquakes]
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap)









  