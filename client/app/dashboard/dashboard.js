(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', Dashboard);

    Dashboard.$inject = ['$scope','socket'];
    function Dashboard($scope,socket) {


        $scope.searchText="";

        //Reset error message
        $scope.$parent.error = null

        //Initialize $scope variables
        $scope.guilds = [];
        $scope.characters = [];

        socket.emit('get:lastGuildAds');
        socket.forward('get:lastGuildAds',$scope);
        $scope.$on('socket:get:lastGuildAds',function(ev,guilds){
            $scope.guilds=guilds;
        });
        socket.emit('get:lastCharacterAds');
        socket.forward('get:lastCharacterAds',$scope);
        $scope.$on('socket:get:lastCharacterAds',function(ev,characters){
            $scope.characters=characters;
        });

        socket.emit('get:charactersCount');
        socket.forward('get:charactersCount',$scope);
        $scope.$on('socket:get:charactersCount',function(ev,characterCount){
            $scope.characterCount=characterCount;
        });

        socket.emit('get:guildsCount');
        socket.forward('get:guildsCount',$scope);
        $scope.$on('socket:get:guildsCount',function(ev,guildCount){
            $scope.guildCount=guildCount;
        });

        socket.emit('get:characterAdsCount');
        socket.forward('get:characterAdsCount',$scope);
        $scope.$on('socket:get:characterAdsCount',function(ev,characterAdCount){
            $scope.characterAdCount=characterAdCount;
        });

        socket.emit('get:guildAdsCount');
        socket.forward('get:guildAdsCount',$scope);
        $scope.$on('socket:get:guildAdsCount',function(ev,guildAdCount){
            $scope.guildAdCount=guildAdCount;
        });

        socket.forward('get:search',$scope);
        $scope.$on('socket:get:search',function(ev,searchResult){
            console.log(searchResult);
            $scope.searchResult=searchResult;
        });

        $scope.search = function(){
            if($scope.searchText.length>=2)
                socket.emit('get:search',$scope.searchText);
        };



    }
})();