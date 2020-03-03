const db = require("../util/database");

const getAllArtists = () => db.execute("Select * from artists");

const addArtist = ({name, desc, img}) =>
  db.execute(
    "Insert into artists (name,desc,img) VALUES ('" +
      name +
      "','" +
      desc +
      "','" +
      img +
      "')"
  );

const getArtist = name => db.query("Select * from people where name = " + name);

module.exports = {
  add: addArtist,
  getall: getAllArtists,
  getArtist: getArtist
};
