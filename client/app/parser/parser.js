(function () {
    'use strict';

    angular
        .module('app.parser')
        .controller('ParserDashboardController', ParserDashboardController)
        .controller('ParserController', ParserController)
    ;

    ParserDashboardController.$inject = ["$scope", "$state", "$stateParams", "$location", "guilds", "wlfgAppTitle"];
    function ParserDashboardController($scope, $state, $stateParams, $location, guilds, wlfgAppTitle) {
        wlfgAppTitle.setTitle("WarcraftParser");

        /**
         * Create a new Guild Ad
         * @param region
         * @param realm
         * @param name
         */
        $scope.createGuildAd = function (region, realm, name) {
            $scope.$parent.loading = true;
            guilds.upsert({guildRegion: region, guildRealm: realm, guildName: name, part: "ad"}, {},
                function () {
                    $state.go("guild-update", {region: region, realm: realm, name: name});
                },
                function (error) {
                    $scope.$parent.error = error.data;
                    $scope.$parent.loading = false;
                });
        };
    }

    ParserController.$inject = ["$scope", "$state", "$stateParams", "$location", "wlfgAppTitle", "guilds", "updates", "user", "moment", "__env"];
    function ParserController($scope, $state, $stateParams, $location, wlfgAppTitle, guilds, updates, user, moment, __env) {
        wlfgAppTitle.setTitle($stateParams.name + ' @ ' + $stateParams.realm + ' (' + $stateParams.region.toUpperCase() + ')');

        $scope.$parent.error = null;
        $scope.$parent.loading = true;

        $scope.route = $state.current.name;

        $scope.current_url = window.encodeURIComponent($location.absUrl());
        $scope.ilvlColor = __env.ilvlColor;
        $scope.sort = 'name';

        $scope.lastReset = getLastDay();
        $scope.raid = __env.tiers[__env.tiers.current];
        $scope.currentTier = __env.tiers.current;

        $scope.difficulty = "normalTimestamp";

        guilds.get({
                "guildRegion": $stateParams.region,
                "guildRealm": $stateParams.realm,
                "guildName": $stateParams.name
            }, function (guild) {
                $scope.guild = guild;
                $scope.$parent.loading = false;
                if (guild.bnet && $scope.$parent.user && $scope.$parent.user.id) {
                    $scope.$parent.loading = true;
                    user.get({
                        param: "guildRank",
                        region: $stateParams.region,
                        realm: $stateParams.realm,
                        name: $stateParams.name
                    }, function (data) {

                        if (guild && !guild.perms) {
                            //No perms set everyone can edit.
                            $scope.userCanEdit = true;
                        }
                        if (data && guild && guild.perms && guild.perms.ad && guild.perms.ad.edit) {
                            if (guild.perms.ad.edit.indexOf(data.rank) >= 0) {
                                $scope.userCanEdit = true;
                            }
                        }

                        $scope.$parent.loading = false;
                    });
                }
            },
            function (error) {
                $scope.$parent.error = error.data;
                $scope.$parent.loading = false;
            }
        );

        $scope.loading = true;

        guilds.query({part: "parser", "guildRegion": $stateParams.region, "guildRealm": $stateParams.realm, "guildName": $stateParams.name
            }, function(guildParser) {
                $scope.loading = false;
                $scope.guildParser = guildParser;
            }, function (error) {
                $scope.$parent.error = error.data;
                $scope.loading = false;
            }
        );

        $scope.updateGuild = function () {
            $scope.$parent.loading = true;
            updates.post({
                type: "guild",
                region: $stateParams.region,
                realm: $stateParams.realm,
                name: $stateParams.name
            }, function (queuePosition) {
                $scope.queuePosition = queuePosition;
                $scope.$parent.loading = false;

            }, function (error) {
                $scope.$parent.error = error.data;
                $scope.$parent.loading = false;
            });
        };

        $scope.switchSort = function(value) {
            if ($scope.sort === value) {
                value = '-'+value;
            }
            
            $scope.sort = value;
        };
    }

    function getLastDay(region) {
        var today = new Date();
        var object;

        var data = {day: "Wednesday", number: 4};

        object = moment().day(-4);
        object.set({'hour': 3, 'minute': 0, 'second': 0});

        return object;
    }
})();