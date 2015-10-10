angular.module('starter.controllers', [])

.controller('HomeCtrl', function($state, $scope, FriendsNearby) {
    $scope.friends = FriendsNearby.all();
    $scope.lieux = "Inconnu";
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

.controller('PlanningSearchCtrl', function($scope, $stateParams, $http){
  var data_headers = 
            {"Content-Type" : "application/x-www-form-urlencoded"};
        
        console.log(data_headers);
  

  $scope.email = $stateParams.email;
  console.log(JSON.parse(window.localStorage['user']).token);
     $http({
        method: 'POST',
        url: "http://46.101.218.111/api/v1/user/search",
        headers: data_headers,
        data: $.param({
            email:  $stateParams.email,
            user_email: JSON.parse(window.localStorage["user"]).email,
            user_token: JSON.parse(window.localStorage["user"]).token
        })
    }).success(function(data, status, a) {
        if (status == 200)
        {
            console.log(data);

        }
    });
})


.controller('PlanningCtrl', function($scope, $state) {
  $scope.search = function(email){
    $state.go('tab.search', {email: email});
  }
})


.controller('MapController', function($scope, $ionicLoading, FriendsNearby) {
    $scope.friends = FriendsNearby.all();
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


/*.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    //enableFriends: true
  };
})*/

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
})
.controller('EventDetailCtrl', function($scope, Events) {  
    $scope.evenemet = Events.get($stateParams.eventId);
})

.controller('AmiDetailCtrl', function($scope, $stateParams, Friends) {  
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('CalendarCtrl', function ($scope, $cordovaCalendar) {

 /* $scope.createCalendar=$cordovaCalendar.createCalendar({
    calendarName: 'Cordova Calendar',
    calendarColor: '#FF0000'
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.deleteCalendar('Cordova Calendar').then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $scope.createEvent=$cordovaCalendar.createEvent({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

/*  $cordovaCalendar.createEventWithOptions({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.createEventInteractively({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.createEventInNamedCalendar({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0),
    calendarName: 'Cordova Calendar'
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.findEvent({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.listEventsInRange(
    new Date(2015, 0, 6, 0, 0, 0, 0, 0),
    new Date(2015, 1, 6, 0, 0, 0, 0, 0)
  ).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.listCalendars().then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.findAllEventsInNamedCalendar('Cordova Calendar').then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.modifyEvent({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0),
    newTitle: 'Ostrich Race',
    newLocation: 'Africa',
    newNotes: 'Bring a saddle',
    newStartDate: new Date(2015, 2, 12, 19, 0, 0, 0, 0),
    newEndDate: new Date(2015, 2, 12, 22, 30, 0, 0, 0)
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });

  $cordovaCalendar.deleteEvent({
    newTitle: 'Ostrich Race',
    location: 'Africa',
    notes: 'Bring a saddle',
    startDate: new Date(2015, 2, 12, 19, 0, 0, 0, 0),
    endDate: new Date(2015, 2, 12, 22, 30, 0, 0, 0)
  }).then(function (result) {
    // success
  }, function (err) {
    // error
  });*/

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
