
jQuery(function ($) {

    function initializeMap() {
        var element = document.getElementById('map');
        var options = {
            zoom: 15,
            center: {lat: 50.47253296158417, lng: 30.443476447314264},
            styles: [
  {
    "elementType": "geometry",
    "stylers": [
      { "color": "#f5f5f5" }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      { "color": "#d9d9d9" } 
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      { "color": "#eeeeee" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#dadada" }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#616161" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#c9c9c9" }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#757575" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#9e9e9e" }
    ]
  }
]
        };
        var myMap = new google.maps.Map(element, options);
        var markers = [{
            coordinates: {lat: 50.47253296158417, lng: 30.443476447314264},
            image: "assets/img/pin.png",
            info: "<div class='map-info'><h4>test</h4><div>test</div><a href='tel:354678'>346577ijhgfv</a></div>"
        },];

        function addMarker(properties) {
            var marker = new google.maps.Marker({position: properties.coordinates, map: myMap, icon: properties.image});
            if (properties.image) {
                marker.setIcon(properties.image);
            }
            if (properties.info) {
                marker.addListener('click', function () {
                    InfoWindow.open(myMap, marker);
                });
                var InfoWindow = new google.maps.InfoWindow({content: properties.info});
            }
        }

        for (var i = 0; i < markers.length; i++) {
            addMarker(markers[i]);
        }
    }
    initializeMap();
});


