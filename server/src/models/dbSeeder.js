const medData = require("./medicament/nomonclature.json");
const pays = require("../../contries.json");
const db = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "pharma_dz",
  },
});

let meds = medData.medicaments;
meds = meds.filter((med) => med?.CODEDCI?.length <= 8 && med?.P2);

//db.batchInsert("medicament", meds, 10);

const insertContries = async () => {
  try {
    await db.batchInsert("countries", pays, 10);
  } catch (e) {
    console.log(e);
  }
};

const insertMeds = async () => {
  try {
    await db.batchInsert("medicament", meds, 10);
  } catch (e) {
    console.log(e);
  }
};

const insertLabs = async () => {
  try {
    await db.batchInsert("laboratoire", meds, 10);
  } catch (e) {
    console.log(e);
  }
};

meds
  .filter(
    (med) =>
      med.PAYS_LABORATOIRE != "ALGERIE" &&
      med.PAYS_LABORATOIRE != "FRANCE" &&
      med.PAYS_LABORATOIRE != "SUISSE" &&
      med.PAYS_LABORATOIRE != "ALLEMAGNE"
  )
  .forEach((element) => {
    console.log(element.PAYS_LABORATOIRE);
  });
