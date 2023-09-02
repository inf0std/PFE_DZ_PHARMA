const params = require("../params/searchEngineParams");
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "Pharma_dz",
  },
});

const medColumnFromId = (id) => {
  return `SUM(CASE WHEN med_id = ${id} THEN QUANTITY - Q_VENDUE ELSE 0 END) AS Q_${id},min(CASE WHEN med_id=${id} THEN  expiration END) AS exp_${id}`;
};
const medsPharmaQuantityQuery = (med_ids) => {
  let sql = "";
  let med_colums = med_ids.map((id) => medColumnFromId(id));
  sql = `SELECT pharmacie_id, ${med_colums.join(
    ","
  )} from stock where expiration > DATE_SUB(DATE(NOW()), INTERVAL ${
    params.getParams().experiation_margin
  } DAY) GROUP BY pharmacie_id`;
  return sql;
};

const createIndexFromIDs = async (list_DCI) => {
  let IDs = await createIndexFromDCIList(list_DCI);

  let sql = medsPharmaQuantityQuery(IDs);
  return knex
    .raw(sql)
    .then((res) => res)
    .then((res) => res[0])
    .catch((error) => console.log("error", error));
};

const createIndexFromDCIList = async (listDCI) => {
  return knex("medicament")
    .select("*")
    .whereIn("code", listDCI)
    .then((res) => {
      return res.map((med) => med.ID);
    })
    .catch(console.log);
};

const createPharmaDistenceIndex = (position, ph_ids) => {
  knex
    .raw(
      `
  SELECT
      id,
      (
          6371 * 
          acos(
              cos(radians(?)) *
              cos(radians(latitude)) *
              cos(radians(longitude) - radians(?)) +
              sin(radians(?)) *
              sin(radians(latitude))
          )
      ) AS distance
  FROM
      pharmacy
  WHERE
      id IN (${pharmacyIds.join(", ")})
`,
      [position.latitude, position.longitude, position.latitude]
    )
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
module.exports = {
  createIndexFromDCIList,
  medsPharmaQuantityQuery,
  createIndexFromIDs,
};
