"use strict";

//Load dependencies
var router = require("express").Router();
var characterController = process.require("characters/characterController.js");

//Define routes
router.get("/characters", characterController.getCharacters);
router.get("/characters/:region/:realm/:name", characterController.getCharacter);
module.exports = router;