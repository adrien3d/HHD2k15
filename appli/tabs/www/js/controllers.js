angular.module('starter.controllers', [])

// .config(function($cordovaFacebookProvider) {
//   var appID = 930561750336396;
//   var version = "v2.5"; // or leave blank and default is v2.0
//   $cordovaFacebookProvider.browserInit(appID, version);
// })


.controller('MapUserCtrl', function($state, $scope, $http) {
    alert("coucou");
})


.controller('HomeCtrl', function($state, $scope, FriendsNearby, $http) {

    $scope.goToMyFriend = function(user_id){
        $state.go("tab.see.user", {'user_id': user_id});
    };

    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
    });

    //   console.log("http://46.101.218.111/api/v1/user/" + JSON.parse(window.localStorage["user"]));

    console.log(window.localStorage["user"]);
    if (window.localStorage["user"] != null) {
        $http({
            method: 'GET',
            url: "http://46.101.218.111/api/v1/profile/",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                'user_email': JSON.parse(window.localStorage["user"]).email,
                'user_token': JSON.parse(window.localStorage["user"]).token
            }
        }).success(function(data, status) {
            console.log(data.user_status);
            $('.button-status').addClass('button-positive').removeClass('button-balanced');
            $('#status_' + data.user_status).addClass('button-balanced');
        });


        //$scope.friends = FriendsNearby.all($scope.lat, $scope.lng);

        FriendsNearby.all().then(function(data) {
            $scope.friends = data;
        });

    }

    $scope.statusUpdate = function(status_id) {
        $('.button-status').addClass('button-positive').removeClass('button-balanced');
        $('#status_' + status_id).addClass('button-balanced');
        console.log(status_id);
        $http({
            method: 'PUT',
            url: "http://46.101.218.111/api/v1/user/" + window.localStorage["user_id"],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
                'user[user_status]': status_id,
                'user_email': JSON.parse(window.localStorage["user"]).email,
                'user_token': JSON.parse(window.localStorage["user"]).token
            })
        });

    };
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

.controller('PlanningSearchCtrl', function($scope, $stateParams, $http) {
    var data_headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    //console.log(data_headers);


    $scope.email = $stateParams.email;
    console.log(JSON.parse(window.localStorage['user']).token);
    $http({
        method: 'POST',
        url: "http://46.101.218.111/api/v1/user/search",
        headers: data_headers,
        data: $.param({
            email: $stateParams.email,
            user_email: JSON.parse(window.localStorage["user"]).email,
            user_token: JSON.parse(window.localStorage["user"]).token
        })
    }).success(function(data, status, a) {
        if (status == 200) {
            console.log(data);

        }
    });
})


.controller('PlanningCtrl', function($scope, $state) {
    $scope.search = function(email) {
        $state.go('tab.search', {
            email: email
        });
    }
})


.controller('MapController', function($scope, $http, $ionicModal, $ionicLoading, FriendsNearby) {
     FriendsNearby.all().then(function(data) {
             $scope.friends = data;
         }
     );

    var tableauMarqueurs = [{
        lat: 50.7011216,
        lng: 3.15806, 
        firstname: "Sebastien"
    } ];

    var nbPos = 1;


    $http({
        method: 'GET',
        url: "http://46.101.218.111/api/v1/friends/",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            'user_email': JSON.parse(window.localStorage["user"]).email,
            'user_token': JSON.parse(window.localStorage["user"]).token
        }
    }).success(function(data, status) {
        if (status == 200) {

            $.each(data, function(index, user) {
                console.log(user);
                if (user.last_position != null) {
                   // console.log(user.last_position);
                    var coords = {
                        "lat": parseFloat(user.last_position.latitude),
                        "lng": parseFloat(user.last_position.longitude),
                        "firstname": user.first_name + " " + user.last_name
                    };
                    tableauMarqueurs.push(coords);
                    nbPos++;
                    console.log(nbPos);
                }
            });
        }
    

    console.log(nbPos);

       var infowindow =  new google.maps.InfoWindow({
            content: ""
        });
console.log("Window");

     function bindInfoWindow(marker, map, infowindow, description) {
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(description);
                infowindow.open(map, marker);
            });
        }



    //   google.maps.event.addDomListener(window, 'load', function() {
    var myLatlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
        center: myLatlng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // navigator.geolocation.getCurrentPosition(function(pos) {
    //     map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //     var myLocation = new google.maps.Marker({
    //         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
    //         map: map,
    //         title: "My Location"
    //     });
    // });

    var imageMarqueur = {
        url: "./img/marker.png",
        size: new google.maps.Size(30, 48),
        anchor: new google.maps.Point(15, 45)
    };

    
    var zoneMarqueurs = new google.maps.LatLngBounds();

    console.log(tableauMarqueurs); 
    console.log(nbPos);

    for (var i = 0; i < nbPos; i++) {
        console.log("it");
        ajouteMarqueur(tableauMarqueurs[i]);
    }
    map.fitBounds(zoneMarqueurs);

       var infowindow =  new google.maps.InfoWindow({
            content: ""
        });
console.log("Window");

     function bindInfoWindow(marker, map, infowindow, description) {
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(description);
                infowindow.open(map, marker);
            });
        }


    function ajouteMarqueur(latlng) {
        var latitude = latlng.lat;
        var longitude = latlng.lng;
        var firstname = latlng.firstname;
        var optionsMarqueur = {
            'map': map,
            position: new google.maps.LatLng(latitude, longitude),
            icon: imageMarqueur
        };
        var marqueur = new google.maps.Marker(optionsMarqueur);
            bindInfoWindow(marqueur, map, infowindow, firstname);
        zoneMarqueurs.extend(marqueur.getPosition());
       // console.log(latlng);
    }

       });


    //FENETRE MODAL INVITATION

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        FriendsNearby.getInvites().then(function(data) {
            console.log(data);
            $scope.Invitations = data;
        });
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    $scope.Invite = function(mail) {
        var data_headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        $http({
            method: 'POST',
            url: "http://46.101.218.111/api/v1/user/search",
            headers: data_headers,
            data: $.param({
                email: mail,
                user_email: JSON.parse(window.localStorage["user"]).email,
                user_token: JSON.parse(window.localStorage["user"]).token
            })
        }).success(function(data, status, a) {
            if (status == 200 || status == 201) {
                $http({
                    method: 'POST',
                    url: "http://46.101.218.111/api/v1/invites",
                    headers: data_headers,
                    data: $.param({
                        friend_id: data.user.id,
                        user_email: JSON.parse(window.localStorage["user"]).email,
                        user_token: JSON.parse(window.localStorage["user"]).token
                    })
                }).success(function(data, status, a) {
                    if (status == 200 || status == 201) {
                        alert("Invitation Envoyée!");
                    } else {
                        alert("Impossible d'ajouter cette personne !");
                    }
                });
            } else {
                alert("Impossible d'ajouter cette personne !");
            }
        });
    };

    $scope.AcceptInvit = function(id, nom, prenom) {
        $http.get(encodeURI('http://46.101.218.111/api/v1/invites/' + id + '/accept?user_email=' + JSON.parse(window.localStorage["user"]).email + '&user_token=' + JSON.parse(window.localStorage["user"]).token))
            .success(function(data, status) {
                if (status == "200" || status == "201") {
                    alert("Vous êtes maintenant amis avec " + prenom + " " + nom + " !");
                }
            })
    }
})


.controller('GroupesCtrl', function($scope) {})

.controller('HistoriqueCtrl', function($scope) {})

.controller('GestionCompteCtrl', function($scope) {})

.controller('ParametresCtrl', function($scope) {})

.controller('AproposCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, $ionicPopup, $state) {

console.log(window.localStorage['user'] );
    if (window.localStorage['user'] != 'null') {
        //user connecté
           $state.go('tab.home');
    }

    $scope.loginFacebook = function() {
        console.log("Soon");
    };
})


//connexion
.controller('SigninCtrl', function($scope, $http, $state) {
    $scope.loginEmail = function(email, password) {
        $http({
            method: 'POST',
            url: "http://46.101.218.111/api/v1/auth",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
                'email': email,
                'password': password
            })
        }).success(function(data, status, a) {
            if (status == 200) {
                console.log(data);
                console.log(data.id);
                var token = data.token;
                var user_id = data.id;
                var user = {
                    'email': email,
                    'token': token
                };

                console.log(user_id);

                window.localStorage['user'] = JSON.stringify(user);
                window.localStorage['user_id'] = user_id;

                alert("Connexion réussie");
                $state.go('tab.home');
            } else if (status == 404) {
                alert("Utilisateur inconnu");
            } else if (status == 500) {
                alert("Mauvais mot de passe");
            }
        });
    }
})


//inscription
.controller('SignupCtrl', function($scope, $http, $state) {
    $scope.signupEmail = function(email, password, firstname, lastname) {

        if (email != "" && password != "") {
            $http({
                method: 'POST',
                url: "http://46.101.218.111/api/v1/user",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param({
                    'user[email]': email,
                    'user[password]': password,
                    'user[last_name]': lastname,
                    'user[first_name]': firstname
                })
            }).success(function(data, status) {
                console.log(status);
                if (status == 201) {
                    alert("Tout va bien");
                    var token = data.authentication_token;
                    var email = data.email;
                    var user_id = data.id;
                    var user = {
                        "email": email,
                        "token": token
                    };
                    console.log(user);
                    console.log(data.token);
                    window.localStorage['user'] = JSON.stringify(user);
                    window.localStorage['user_id'] = user_id;
                    $state.go('tab.home');
                } else {
                    alert("Problème");
                    alert(data);
                }
            }).error(function(data, status) {
                alert("Problème xhr");
                alert(data);
            });

        }

    }
})




.controller('AccountCtrl', function($scope, $http, $state) {
    $scope.logout = function() {
        window.localStorage['user'] = 'null';
        $state.go('login');
    };




    $http({
        method: 'GET',
        url: "http://46.101.218.111/api/v1/profile/",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            'user_email': JSON.parse(window.localStorage["user"]).email,
            'user_token': JSON.parse(window.localStorage["user"]).token
        }
    }).success(function(data, status) {


        if (status == 200) {
            $scope.user_name = data.first_name + " " + data.last_name;

        } else {

        }
    }).error(function(data, status) {

    });

})


.controller('EventDetailCtrl', function($scope, Events) {
    $scope.evenemet = Events.get($stateParams.eventId);
})

.controller('AmiDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})