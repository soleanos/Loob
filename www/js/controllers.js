angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,apiRiot) {

  $scope.searchPlayer = function(playerToFind) {

    playerToFind = playerToFind.replace(' ', '');

    if (playerToFind != "") {
      apiRiot.get(playerToFind).then(function (playerList) {

        console.log("une requete est envoyé a l'API DE RIOT !!!!")
        
        $scope.$watch('scope.playerToFind', function () {
          console.log(playerToFind);
        });

        for (var propName in playerList) {
          if (playerList.hasOwnProperty(propName)) {
            var player = playerList[propName];
            if(player){$scope.showPlayer = true}else{$scope.showPlayer = false}
            $scope.player = player;
          }
        }

      });
    }else{
      $scope.showPlayer = false;
    }
  }

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
