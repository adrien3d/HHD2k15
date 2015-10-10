angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, FriendsNearby) {
    $scope.friends = FriendsNearby.all();
})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})


.controller('PlanningCtrl', function($scope) {})

.controller('MapController', function($scope, $ionicLoading) {
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(0, 0);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
        $scope.map = map;
    });
})


<<<<<<< HEAD
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    //enableFriends: true
  };
})

.controller('GroupesCtrl', function($scope) {
})

.controller('HistoriqueCtrl', function($scope) {
})

.controller('GestionCompteCtrl', function($scope) {
})

.controller('ParametresCtrl', function($scope) {
})

.controller('AproposCtrl', function($scope) {
})


.controller('AccountCtrl', function($scope, $http) {
    $http({
        method: 'POST',
        url: "http://46.101.218.111/api/v1/auth",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
            email: 'scockedey@hotmail.fr',
            password: 'bitebite'
        })
    }).success(function(data, status, a) {
        if (status == 200)
        {
            var token = data.token;
            var user = {
              email: 'insert@email.fr',
              token: token
            };

            window.localStorage['user'] = JSON.stringify(user);
            $("#token").text(token);
        }
    });
});


/*
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})*/

