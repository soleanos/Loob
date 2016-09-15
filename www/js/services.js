angular.module('starter.services', []).factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
})

.factory('apiRiot', function($http) {

    var getRiotApiData = function (player) {

        console.log(player);
        var key = "RGAPI-ECC57D56-BF35-4337-803B-5F299944F584";
        var url = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/"+player+"?api_key=" + key;

        var promise = $http.get(url).then(function(response){;
            return response.data;
        }, function(err){
            return err;
        });

        var promise2 = promise.then(
            function(playerList) {

                for (var propName in playerList) {
                    if (playerList.hasOwnProperty(propName)) {
                        var player = playerList[propName];
                    }
                }

                var url2 = "https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/"+player.id+"/summary?season=SEASON2016&api_key=" + key;

                return $http.get(url2).then(function(response){
                  // console.log(response.data.playerStatSummaries);
                  return response.data.playerStatSummaries;
                }, function(err){
                    return err;
                });

            }
        ).catch(function(err) {
            console.log(err);
        });

       var tabPromise = [promise,promise2];

        var megaGigaPromiseOfTheDeath = Promise.all(tabPromise).then(
           function(values){
            // console.log("values grosse promesse : ");
            //  console.log(values);
             return values;
           }
        );

    return megaGigaPromiseOfTheDeath;
  }

  return {
    get: getRiotApiData
  };
});
