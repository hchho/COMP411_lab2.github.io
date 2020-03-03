const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const expressHbs = require("express-handlebars");
const app = express();

const FILE_NAME = "Artists.json";
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "public/views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);

app.set("view engine", "hbs");
app.set("views", "public/views");

const getAllArtistsFromFile = () =>
  new Promise((resolve, reject) => {
    fs.readFile(FILE_NAME, (err, rawData) => {
      if (err) reject(err);
      else resolve(rawData);
    });
  }).then(rawData => Object.assign({}, rawData && JSON.parse(rawData)));

const writeArtistsToFile = artists =>
  new Promise((resolve, reject) => {
    fs.writeFile(FILE_NAME, JSON.stringify(artists), (err, data) => {
      if (err) reject(err);
      else resolve(artists);
    });
  });

app.get("/", (req, res) =>
  getAllArtistsFromFile()
    .then(data =>
      res.render("home", {
        artists: Object.keys(data).map(k =>
          Object.assign({}, data[k], { id: k })
        )
      })
    )
    .catch(() => res.status(400))
);

app.post("/addNewArtist", (req, res) =>
  getAllArtistsFromFile()
    .then(result => {
      const newArtist = req.body;

      const newId = new Date().getTime();
      const formedArtist = {};
      formedArtist[`${newId}`] = newArtist;

      const finalResult = Object.assign({}, result, formedArtist);
      return writeArtistsToFile(finalResult)
        .then(() => res.redirect("/"))
        .catch(err => {
          throw err;
        });
    })
    .catch(() => res.status(400))
);

app.delete("/deleteArtist/:id", (req, res) =>
  getAllArtistsFromFile()
    .then(artistList => {
      const artistId = req.params.id;

      delete artistList[artistId];
      return writeArtistsToFile(artistList)
        .then(() => res.redirect(200, "/"))
        .catch(err => {
          throw err;
        });
    })
    .catch(() => res.status(400))
);

app.get("/getArtistByName", (req, res) =>
  getAllArtistsFromFile()
    .then(artistList => {
      const targetName = req.query.name
      const result = Object.keys(artistList).reduce((acc, key) => {
        const data = artistList[key];
        if (data.name.toLowerCase().includes(targetName.toLowerCase())) {
          const tempResult = {};
          tempResult[`${key}`] = data;
          return { ...acc, ...tempResult };
        } else {
          return acc;
        }
      }, {});
    //   return res.json(result);
    res.render('home', { artists:  Object.keys(result).map(k =>
        Object.assign({}, result[k], { id: k })
      )})
    })
    .catch(err => res.status(400))
);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
