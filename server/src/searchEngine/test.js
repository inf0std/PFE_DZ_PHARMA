const engine = require("./queryGenerators");

//console.log(engine.createIndexFromDCIList(["01 A 003", "01 A 007"]));
engine.createIndexFromIDs(["01 A 003", "01 A 007"]).then(console.log);
