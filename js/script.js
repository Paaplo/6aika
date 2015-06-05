angular.module('karttaApp', [])
	.controller('MapLocationController', function($scope, $http) {
		$scope.items = [];	
		$http.get("http://visittampere.fi:80/api/search?type=location&limit=10")
			.success(function(data, status) {
				$scope.items = data;
				angular.forEach($scope.items, function(value, key) {
					if(value.contact_info.city === 'Tampere') {
						$http.get("http://api.publictransport.tampere.fi/prod/?request=geocode&user=trehopon&pass=6aikahackaton&key=" + value.contact_info.address)
						.success(function(data, status) {
							console.log(data);
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

		$scope.getLocation = function(address) {
			/*$http.get("http://api.publictransport.tampere.fi/prod/?request=geocode&user=trehopon&pass=6aikahackaton&key=" + address)
			.success(function(data, status) {
				return data;
			})
			.error(function(data, status) {
				return "Not found";
			});*/
		}
	});