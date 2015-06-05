

angular.module('karttaApp', [])
.controller('MapLocationController', function($scope, $http) {
	$scope.items = [];
	var pos = new google.maps.LatLng(61.4991100,23.7871200);
	var map;
	var mapOptions = {
    	zoom: 10,
    	disableDefaultUI: true,
    	center: pos,
    	styles: 
    	[{'featureType':'administrative','elementType':'all','stylers':[{'visibility':'on'},{'saturation':-100},{'lightness':20}]},{'featureType':'road','elementType':'all','stylers':[{'visibility':'on'},{'saturation':-100},{'lightness':40}]},{'featureType':'water','elementType':'all','stylers':[{'visibility':'on'},{'saturation':-10},{'lightness':30}]},{'featureType':'landscape.man_made','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':-60},{'lightness':10}]},{'featureType':'landscape.natural','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':-60},{'lightness':60}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'},{'saturation':-100},{'lightness':60}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'},{'saturation':-100},{'lightness':60}]}]  
    };        
	
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	RenderMap = function(value) {
		var loc = new google.maps.LatLng(value.lat,value.lng);

    	var marker = new google.maps.Marker({
    		position: loc,
    		map: map,
    		title: 'Hello World!'
    	});
	};

	
	$http.get("http://visittampere.fi:80/api/search?type=location&limit=10")
	.success(function(data, status) {
		$scope.items = data;
		angular.forEach($scope.items, function(value, key) {
			if(value.contact_info.city === 'Tampere') {
				$http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+value.contact_info.address+"&key=AIzaSyDv8gnwsTryzX8qCKH7FK_BuowW7cRrd5g")
				.success(function(data, status) {

					value.contact_info.lat = data.results[0].geometry.location.lat;
					value.contact_info.lon = data.results[0].geometry.location.lng;
					console.log(data.results[0].geometry.location);
					RenderMap(data.results[0].geometry.location);
				})
				.error(function(data, status) {
					console.log(data);
				});
			}
		});
	})
	.error(function(data, status) {
		console.log(sata || "Request failed");
	});

	

/*	var map;
	var pos;

    //Center of Tampere
    
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

    angular.forEach($scope.items, function(value, key) {
    	console.log("KÄÄK");
    	var loc = new google.maps.LatLng(value.lat,value.lng);

    	var marker = new google.maps.Marker({
    		position: loc,
    		map: map,
    		title: 'Hello World!'
    	});


    });
*/

	meSpeak.loadConfig("js/vendor/mespeak/mespeak_config.json");
        meSpeak.loadVoice('js/vendor/mespeak/voices/en/en-us.json');
	
	$scope.speakTitle = function(id) {
	    console.log("speak: " + id);
	    console.log($scope.items);
	    for (var i = 0; i < $scope.items.length; i++) {
		if ($scope.items[i].item_id == id) {
		    console.log("speak");
		    meSpeak.speak($scope.items[i].description, {speed: 150, variant: "f1", linebreak: 10, pitch: 60});
		    break;
		}
	    }
	}
});


