const model = require("../models/Artist")

const parseArtists = data => ({
  artists: Object.keys(data).map(k =>
    Object.assign({}, data[k], { id: k })
  )
})

const writeArtistsToFile = artists =>
  new Promise((resolve, reject) => {
    fs.writeFile(FILE_NAME, JSON.stringify(artists), (err, data) => {
      if (err) reject(err);
      else resolve(artists);
    });
  });

exports.getAllArtists = async (req, res) => {
  try {
    const result = await model.getall()
    const data = result[0]
    res.render("home", parseArtists(data))
  } catch (e) {
    console.error(e)
    res.status(400)
  }
}

exports.addArtists = async (req, res) => {
  try {
    const newArtist = req.body;
    await model.add(newArtist)
    res.redirect('/artists')
  } catch (e) {
    console.error(e)
    res.status(400)
  }
}

exports.getArtists = async (req, res) => {
  try {
    const targetName = req.query.name;
    const result = await model.getArtist(targetName)
    const data = result[0]
    res.render("home", parseArtists(data));
  } catch (e) {
    console.error(e)
    res.status(400)
  }
}

exports.deleteArtists = (req, res) =>
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
    .catch(() => res.status(400));
