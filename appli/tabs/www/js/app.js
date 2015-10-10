// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-material', 'ngCordova'])


.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function($scope) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

//    Parse.initialize("OyrdgIFVES0sarbrtni7htyIeqnVrplO8VG0e7TD", "2ak6tbmwsrsOwbq7e3BvV63Jb9g1HY946yBoWqQg");

 


    //Bluetooth
/*    ble.isEnabled(
        function() {
          alert("Bluetooth is enabled");
        },
        function() {
          console.log("Bluetooth is *not* enabled");
          alert("Bluetooth is *not* enabled");
        }
    );*/


    function failure(){
      alert('CONNECTION FAIL BITCH');
    }

  //   setInterval(ScanForFriends, 10000);

  //   function ScanForFriends(){
  //     ble.startScan([], function(device) {
  //       //alert(device.name+' | '+device.rssi);
  //       //if(device.id == "86D46DF4-BF47-15B4-DFDB-AFB2EC7AD143"){
  //       //    alert(device.rssi);
  //       //}
  //       $scope.lieux="Inconnu";


  //       if(device.id == "86D46DF4-BF47-15B4-DFDB-AFB2EC7AD143" && device.rssi <90){
  //         $scope.lieux = "Plaine Image";




  //         //$state.go($state.current, {}, {reload: true});
  //       }

  //       //$http.post("", {"lieux" : lieux});
  //     }, failure);
  //   }



   });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  
    .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

    .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'SigninCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })




  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapController'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.planning', {
    url: '/planning',
    views: {
      'tab-planning': {
        templateUrl: 'templates/tab-planning.html',
        controller: 'CalendarCtrl'
      }
    }
  })

   .state('tab.search', {
    url: '/planning/:email',
    views: {
      'tab-planning': {
        templateUrl: 'templates/tab-planning-search.html',
        controller: 'PlanningSearchCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.groupes', {
    url: '/groupes',
    views: {
      'tab-groupes': {
        templateUrl: 'templates/tab-groupes.html',
        controller: 'GroupesCtrl'
      }
    }
  })

    .state('tab.historique', {
    url: '/historique',
    views: {
      'tab-historique': {
        templateUrl: 'templates/tab-historique.html',
        controller: 'HistoriqueCtrl'
      }
    }
  }) 

.state('tab.gestioncompte', {
    url: '/gestioncompte',
    views: {
      'tab-gestioncompte': {
        templateUrl: 'templates/tab-gestioncompte.html',
        controller: 'GestionCompteCtrl'
      }
    }
  })

.state('tab.parametres', {
    url: '/parametres',
    views: {
      'tab-parametres': {
        templateUrl: 'templates/tab-parametres.html',
        controller: 'ParametresCtrl'
      }
    }
  }) 

 .state('tab.apropos', {
    url: '/apropos',
    views: {
      'tab-apropos': {
        templateUrl: 'templates/tab-apropos.html',
        controller: 'AproposCtrl'
      }
    }
  })
 
 .state('tab.event-detail', {
    url: '/planning/:eventID',
    views: {
      'tab-planning': {
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  .state('tab.ami-detail', {
    url: '/map/:friendID',
    views: {
      'tab-map': {
        templateUrl: 'templates/ami-detail.html',
        controller: 'AmiDetailCtrl'
      }
    }
  })




  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/');

  /*$urlRouterProvider.otherwise('/tab/dash');
      var params = {
        request: true,
        time : 10000 //in milliseconds, time to scan defaults to 5000ms if not provided
      };

  $cordovaBluetoothle.startScan(params).then(function(success) {
    console.log(device.name);
    console.log(device.address);
  });*/
})



