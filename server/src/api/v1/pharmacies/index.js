const db = require("../../../models/db");

const handleCreatePharmacy = (req, res) => {
  console.log(req.body);
  const { name, coordinates, adress } = req.body;
  console.log(coordinates);
  const [latitude, longitude] = coordinates.split(",");
  console.log(latitude, longitude);

  let con = db.getConnection();
  /*  con("pharmacies")
    .insert({
      name: name,
      coordinates: con.raw(`ST_GeomFromText(POINT(${latitude} ${longitude}))`),
      adress: adress,
    })
    .then(() => {});
  con
    .raw("INSERT INTO pharmacies(name, cordinates, adress) values(?,?,?)", [
      name,
      `ST_GeomFromText(POINT(${latitude} ${longitude}))`,
      adress,
    ])
    .then((record) => console.log)
    .catch((err) => console.log)
    .finally(() => {
      con.destroy();
    });

    const knex = require("knex")({
      client: "your_database_client",
      connection: {
        host: "your_database_host",
        user: "your_database_user",
        password: "your_database_password",
        database: "your_database_name",
      },
    });

    const name = "Pharmacy";
    const latitude = 37.7749;
    const longitude = -122.4194;
    const address = "123 Main St";
 */
  con
    .raw(
      "INSERT INTO pharmacies (name, coordinates, adress) VALUES (?, POINT(?, ?), ?)",
      [name, longitude, latitude, adress]
    )
    .then((result) => {
      console.log("Data inserted successfully");
      console.log(result);
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
    })
    .finally(() => {
      con.destroy();
    });
};
module.exports = {
  handleCreatePharmacy,
};
