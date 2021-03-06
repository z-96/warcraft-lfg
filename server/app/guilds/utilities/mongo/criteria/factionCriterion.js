"use strict";

//Load dependencies
var params = process.require("core/utilities/params.js");

/**
 * Add the faction criterion to guild criteria
 * @param query
 * @param criteria
 */
module.exports.add = function (query, criteria) {

    var paramArray = params.parseQueryParam(query.faction, 1);

    if (paramArray.length > 0) {
        if (paramArray[0][0] == 0) {
            criteria["bnet.side"] = 0;
        }
        if (paramArray[0][0] == 1) {
            criteria["bnet.side"] = 1;
        }
    }

};