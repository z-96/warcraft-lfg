(function() {
    'use strict';

    angular
        .module('app.resource')
        .factory('ranking', Ranking);

    Ranking.$inject = ['$resource'];
    function Ranking($resource) {
        return $resource('https://api.warcraftprogress.com/api/v1/ranks/:tier/:region/:realm/:name');
    }
})();