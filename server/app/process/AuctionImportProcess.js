"use strict";

var logger = process.require("api/logger.js").get("logger");
var auctionImportService = process.require("services/auctionImportService.js");

function AuctionImportProcess(){
}

AuctionImportProcess.prototype.importAuctions = function(){
    auctionImportService.importAuctions();
};

AuctionImportProcess.prototype.start = function(){
    logger.info("Starting AuctionImportProcess");
    //Start Cron every sec
    this.importAuctions();
};

module.exports = AuctionImportProcess;