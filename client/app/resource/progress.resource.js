(function() {
    'use strict';

    angular
        .module('app.resource')
        .factory('progress', Progress);

    Progress.$inject = ['$resource', '__env'];
    function Progress($resource, __env) {
        return $resource(__env.apiProgressUrl+'/api/v1/progress/:tier/:region/:realm/:name');
    }
})();