const model = require("../models/Artist")

const parseArtists = data => ({
  artists: Object.keys(data).map(k =>
    Object.assign({}, data[k])
  )
})

exports.getAllArtists = async (req, res) => {
  try {
    const result = await model.getall()
    const data = result[0]
    res.render("home", {...parseArtists(data), artistsCSS: true })
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
    res.render("home", {...parseArtists(data), artistsCSS: true });
  } catch (e) {
    console.error(e)
    res.status(400)
  }
}

exports.deleteArtists = async (req, res) => { 
  try {
    const artistId = req.params.id
    const result = await model.deleteArtist(artistId)
    res.redirect("/artists")
  } catch (e) {
    console.error(e)
    res.status(400)
  }
}

exports.logout = (req, res) => {
  res.redirect("/login")
}
