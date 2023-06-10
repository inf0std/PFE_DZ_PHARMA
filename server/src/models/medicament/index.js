//"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("./nomonclature.json");
let medicaments = JSON.parse(rawdata);

module.exports = medicaments;
