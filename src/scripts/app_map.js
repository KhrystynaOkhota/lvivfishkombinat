
jQuery(function ($) {

    function initializeMap() {
        var element = document.getElementById('map');
        var options = {
            zoom: 15,
            center: {lat: 50.47253296158417, lng: 30.443476447314264},
            styles: [{"elementType": "geometry", "stylers": [{"color": "#f5f5f5"}]}, {
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#616161"}]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#f5f5f5"}]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#bdbdbd"}]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#eeeeee"}]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#757575"}]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{"color": "#e5e5e5"}]
            }, {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#9e9e9e"}]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#757575"}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{"color": "#dadada"}]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#616161"}]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#9e9e9e"}]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{"color": "#e5e5e5"}]
            }, {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{"color": "#eeeeee"}]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#c9c9c9"}]
            }, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"}]}]
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


