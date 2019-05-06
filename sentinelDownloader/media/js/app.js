// center of the map
let center = [-33.8650, 151.2094];

// Create the map
let map = L.map('map').setView(center, 6);

// Set up the OSM layer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

// add a marker in the given location
L.marker(center).addTo(map);

// Initialise the FeatureGroup to store editable layers
let editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

let drawPluginOptions = {
    position: 'topright',
    draw: {
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#97009c'
            }
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: false,
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false
    }
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
let drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);

map.on('draw:created', function(e) {
    let type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    editableLayers.addLayer(layer);
});

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
//
// }
//
// map.on('click', onMapClick);
//
// var popup = L.popup();
//
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
//
// }
//
// mymap.on('click', onMapClick);