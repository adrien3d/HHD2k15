var app = angular.module('starter.services', [])

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 1,
    name: 'Elie Alawoe',
    lastText: "Ben alors, on attend pas Élie ?",
    face: 'https://i.vimeocdn.com/portrait/8889425_300x300.jpg'
  }, {
    id: 0,
    name: 'Maxence Henneron',
    lastText: "Un p'tit verre à la plage ?",
    face: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/073/292/1632362.jpg'
  }, {
    id: 2,
    name: 'Sebastien Cockedey',
    lastText: 'Look at my mukluks !',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  },];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

app.factory('CalculateDistance', function (lat1, lng1, lat2, lng2){
  var R = 6371000; // metres
  var nlat1 = lat1.toRadians();
  var nlat2 = lat2.toRadians();
  var dlat = (lat2-lat1).toRadians();
  var dlon = (lon2-lon1).toRadians();

  var a = Math.sin(dlat/2) * Math.sin(dlat/2) +
          Math.cos(nlat1) * Math.cos(nlat2) *
          Math.sin(dlon/2) * Math.sin(dlon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d;
});


app.service('FriendsNearby', function($http, $q) {

  var data_headers =
  {"Content-Type" : "application/x-www-form-urlencoded"};

  //console.log(data_headers);

  //console.log(JSON.parse(window.localStorage['user']).token);

  var service = {
    friends: [],
    all: function () {

      var def = $q.defer();

      $http.get(encodeURI('http://46.101.218.111/api/v1/friends?user_email=' + JSON.parse(window.localStorage["user"]).email + '&user_token=' + JSON.parse(window.localStorage["user"]).token))
          .success(function (users) {
            //console.log(users);

            users.forEach(function (user) {
              //console.log(user);
              service.friends.push({
                id: user.id,
                user_status: user.user_status,
                name: user.last_name + " " + user.first_name,
                //distance: user.distance,
                face: user.face
              })
            });

            //console.log(service.friends);
            def.resolve(service.friends);
          })
          .error(function () {
            def.reject('Impossible de recupérer les utilisateurs');
          });

      return def.promise;
      //return service.friends;
    },
    getFromApi: function () {
      /*return $http.post("https://www.yoursite.com/users").then(function(response){
       users = response;
       return users;
       });*/

    },
    get: function (friendId) {
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].id === parseInt(friendId)) {
          return friends[i];
        }
      }
      return null;
    },
      invitations : [],
      getInvites: function(userId){
          var def = $q.defer();

          $http.get(encodeURI('http://46.101.218.111/api/v1/requests?user_email=' + JSON.parse(window.localStorage["user"]).email + '&user_token=' + JSON.parse(window.localStorage["user"]).token))
              .success(function (invitations) {
                  service.invitations = [];
                  //console.log(invitations);

                  invitations.forEach(function (invitation) {
                      //console.log(user);
                      service.invitations.push(invitation);
                  });
                  def.resolve(service.invitations);
                  })
              .error(function () {
                  def.reject('Impossible de recupérer les invitations');
              });

          return def.promise;
      }
  };

  return service;

});

/*
.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
*/