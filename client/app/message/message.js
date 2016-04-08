(function () {
    'use strict';

    angular
        .module('app.message')
        .controller('MessageController', Message)
    ;

    Message.$inject = ["$scope", "socket", "$stateParams", "messages", "wlfgAppTitle"];
    function Message($scope, socket, $stateParams, messages, wlfgAppTitle) {
        wlfgAppTitle.setTitle($stateParams.name + ' @ ' + $stateParams.realm + ' (' + $stateParams.region.toUpperCase() + ')');
        //Reset error message
        $scope.$parent.error = null;

        $scope.region = $stateParams.region;
        $scope.realm = $stateParams.realm;
        $scope.name = $stateParams.name;


        $scope.$parent.loading = true;
        messages.query({
            creatorId: $stateParams.creatorId,
            type: $stateParams.type,
            region: $stateParams.region,
            realm: $stateParams.realm,
            name: $stateParams.name
        }, function (messages) {
            $scope.$parent.loading = false;
            $scope.messages = messages;
        }, function (error) {
            $scope.$parent.error = error.data;
            $scope.$parent.loading = false;
        });


        $scope.newMessage = {text: ""};

        $scope.sendMessage = function () {
            messages.post({
                creatorId: $stateParams.creatorId,
                type: $stateParams.type,
                region: $stateParams.region,
                realm: $stateParams.realm,
                name: $stateParams.name,
                text: $scope.newMessage.text
            }, function () {
                $scope.newMessage.text = "";
            }, function (error) {
                $scope.$parent.error = error.data;
                $scope.$parent.loading = false;
            });
        };


        socket.forward('newMessage', $scope);
        $scope.$on('socket:newMessage', function (ev, message) {
            console.log(message);
            if (message.creatorId == $stateParams.creatorId && message.type == $stateParams.type && message.region == $stateParams.region && message.realm == $stateParams.realm && message.name == $stateParams.name) {
                $scope.messages.push(message);
            }
        });

    }
})();