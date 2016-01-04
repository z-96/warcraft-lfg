"use strict";

var async = require("async");
var guildModel = process.require("guilds/guildModel.js");
var bnetAPI = process.require("api/bnet.js");

/**
 * Sanitize and set the user's id to the guild
 * @param region
 * @param realm
 * @param name
 * @param id
 * @param callback
 */
module.exports.setId = function(region,realm,name,id,callback){
    async.waterfall([
        function(callback){
            bnetAPI.getGuild(region,realm,name,[],function(error,guild){
                callback(error,guild);
            });
        },
        function(guild,callback){
            guildModel.upsert(
                {region:region,realm:guild.realm,name:guild.name},
                {$set:{region:region,realm:guild.realm,name:guild.name},$addToSet: {id: id}},
                function(error){
                    callback(error);
                });
        }
    ],function(error){
        callback(error);
    });
};

