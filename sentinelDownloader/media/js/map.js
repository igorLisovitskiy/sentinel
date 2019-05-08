var inputRange = document.forms[0].elements[0];
var inputNumb = document.forms[0].elements[1];
inputNumb.onchange = function (e) {
    inputRange.value = inputNumb.value;
};
inputRange.onchange = function (e) {
    inputNumb.value = inputRange.value;
};
var dateDefaultStart = new Date();
var dateDefaultFinish = new Date();
dateDefaultStart.setDate(dateDefaultStart.getDate() - 3);
document.getElementById('finish').valueAsDate = dateDefaultFinish;
document.getElementById('finish').maxAsDate = dateDefaultFinish;
document.getElementById('start').valueAsDate = dateDefaultStart;

var MapModel = class MapModel {
        constructor(center){
            this.map = L.map('map',{drawControl:true}).setView(center, 13);
            this.setup(center);
        }
        setup(center){
            // Set up the OSM layer
            L.tileLayer(
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
              }).addTo(this.map);
            // add a marker in the given location
            L.marker(center).addTo(this.map);
            // Initialise the FeatureGroup to store editable layers
            var editableLayers = new L.FeatureGroup();
            this.map.addLayer(editableLayers);
            var drawPluginOptions = {
              position: 'topright',
              draw: {
                rectangle: {
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
                polygon: false,
                marker: false,
                },
              edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: false
              }
            };
            // Initialise the draw control and pass it the FeatureGroup of editable layers
            var drawControl = new L.Control.Draw(drawPluginOptions);
            this.map.addControl(drawControl);
            this.map.on('draw:created', function(e) {
              var type = e.layerType,
                layer = e.layer;
              if (type === 'marker') {
                layer.bindPopup('A popup!');
              }
              editableLayers.clearLayers();
              editableLayers.addLayer(layer);
            });
        }

        resetMap(){
            for(var i in this.map._layers) {
                if(this.map._layers[i]._path != undefined) {
                    try {
                        this.map.removeLayer(this.map._layers[i]);
                    }
                    catch(e) {
                        console.log("problem with " + e + this.map._layers[i]);
                    }
                }
            }
        }
};

