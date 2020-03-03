const db = require("../util/database");

const getAllArtists = () => db.query("Select * from artists")

const addArtist = ({ name, about, img }) =>
  db.execute(
    "Insert into artists (name,about,img) VALUES ('" +
    name +
    "','" +
    about +
    "','" +
    img +
    "')"
  );

const getArtist = name => db.query(`Select * from artists where name like '%${name}%'`);

module.exports = {
  add: addArtist,
  getall: getAllArtists,
  getArtist: getArtist
};
