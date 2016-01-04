"use strict";
var router = require("express").Router();
var applicationStorage = process.require("api/applicationStorage.js");
var realmModel = process.require("realms/realmModel.js");
var realmZonesCriteria =  process.require("params/criteria/realmZonesCriteria.js");

/**
 * Return the realms
 * @param req
 * @param res
 */
function getRealms(req,res) {
    var logger = applicationStorage.logger;
    logger.verbose("%s %s %s", req.method, req.path, JSON.stringify(req.query));
    var criteria = {};
    realmZonesCriteria.add(req.query,criteria);

    realmModel.find(criteria,{name:1,region:1,"_id":0}).sort({name:1,region:1}).exec(function(error,realms){
        if(error){
            logger.error(error.message);
            res.status(500).send();
        }
        res.json(realms);
    });
}


//Define routes
router.get("/realms", getRealms);

module.exports = router;