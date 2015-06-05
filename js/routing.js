$(document).ready(function(){
	var map;
	var pos;
	initiateGoogleMap();
	function initiateGoogleMap(){
        //Center of Tampere
        /*var latitude = parseFloat($('#latitude').text());
        var longitude = parseFloat($('#longitude').text());
        console.log(latitude, " ", longitude);*/
        var pos = new google.maps.LatLng(61.4991100,23.7871200);

        var mapOptions = {
            zoom: 14,
            disableDefaultUI: true,
            center: pos,
            styles: 
            [{'featureType':'administrative','elementType':'all','stylers':[{'visibility':'on'},{'saturation':-100},{'lightness':20}]},{'featureType':'road','elementType':'all','stylers':[{'visibility':'on'},{'saturation':-100},{'lightness':40}]},{'featureType':'water','elementType':'all','stylers':[{'visibility':'on'},{'saturation':-10},{'lightness':30}]},{'featureType':'landscape.man_made','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':-60},{'lightness':10}]},{'featureType':'landscape.natural','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':-60},{'lightness':60}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'},{'saturation':-100},{'lightness':60}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'},{'saturation':-100},{'lightness':60}]}]  
        };        
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var marker = new google.maps.Marker({
		      position: pos,
		      map: map,
		      title: 'Hello World!'
		});
    }
});