var app = angular.module('starter.services', [])

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Maxence Henneron',
    lastText: 'You on your way?',
    face: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/073/292/1632362.jpg'
  }, {
    id: 1,
    name: 'Elie Alawoe',
    lastText: 'Hey, it\'s me',
    face: 'https://i.vimeocdn.com/portrait/8889425_300x300.jpg'
  }, {
    id: 2,
    name: 'Adrien Chapelet',
    lastText: 'I should buy a boat',
    face: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/062/3d9/3598455.jpg'
  }, {
    id: 3,
    name: 'Sebastien Cockedey',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Sebastien Merchez',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }, {
    id: 5,
    name: 'Xavier Chevalier',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

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


app.factory('FriendsNearby', function($http) {

  var data_headers =
  {"Content-Type" : "application/x-www-form-urlencoded"};

  console.log(data_headers);

  console.log(JSON.parse(window.localStorage['user']).token);
  $http.get(encodeURI('http://46.101.218.111/api/v1/user?user_email='+ JSON.parse(window.localStorage["user"]).email+'&user_token=' +JSON.parse(window.localStorage["user"]).token));
    /*method: 'GET',
    url: "http://46.101.218.111/api/v1/user",
    headers: data_headers,
    data: {
      user_email: JSON.parse(window.localStorage["user"]).email,
      user_token: JSON.parse(window.localStorage["user"]).token
    }
  }).success(function(data, status, a) {
    if (status == 200)
    {
      console.log(data);

    }
  });*/

  var friends = [{
    id: 0,
    type: 0,
    name: 'Maxence Henneron',
    distance: 1200,
    face: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/073/292/1632362.jpg'
  }, {
    id: 1,
    type: 1,
    name: 'Elie Alawoe',
    distance: 8200,
    face: 'https://i.vimeocdn.com/portrait/8889425_300x300.jpg'
  },{
    id: 2,
    type: 1,
    name: 'Sebastien Cockedey',
    distance: 8200,
    face: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/005/0ae/3ea/1144fd7.jpg'
  }, {
    id: 3,
    type: 2,
    name: 'Adrien Chapelet',
    distance: 15200,
    face: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/062/3d9/3598455.jpg'
  }];

  return {
    all: function() {
      return friends;
    },
    getFromApi: function() {
      /*return $http.post("https://www.yoursite.com/users").then(function(response){
        users = response;
        return users;
      });*/
    },
    get: function(friendId) {
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].id === parseInt(friendId)) {
          return friends[i];
        }
      }
      return null;
    }
  };
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