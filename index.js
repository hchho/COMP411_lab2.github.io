const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

const FILE_NAME = "Artists.json"
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

const getAllArtistsFromFile = () => new Promise((resolve, reject) => {
    fs.readFile(FILE_NAME, (err, rawData) => {
        if (err) reject(err)
        else resolve(rawData)
    })
})
    .then(rawData => Object.assign({}, rawData && JSON.parse(rawData)))

const writeArtistsToFile = artists => new Promise((resolve, reject) => {
    fs.writeFile(FILE_NAME, JSON.stringify(artists), (err, data) => {
        if (err) reject(err)
        else resolve(artists)
    })
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "index.html")))

app.get('/getAllArtists', (req, res) => getAllArtistsFromFile()
    .then(data => res.json(data))
    .catch(() => res.status(400)))

app.post('/addNewArtist', (req, res) => getAllArtistsFromFile()
    .then(result => {
        const newArtist = req.body
        const finalResult = Object.assign({}, result, newArtist)
        return writeArtistsToFile(finalResult)
            .then(data => res.json(data))
            .catch(err => { throw err })
    })
    .catch(() => res.status(400)))

app.delete('/deleteArtist/:id', (req, res) => getAllArtistsFromFile()
    .then(artistList => {
        const artistId = req.params.id

        delete artistList[artistId]
        return writeArtistsToFile(artistList)
            .then(data => res.json(data))
            .catch(err => { throw err })
    })
    .catch(() => res.status(400)))

app.get('/getArtist/:name', (req, res) => getAllArtistsFromFile()
    .then(artistList => {
        const targetName = req.params.name

        const result = Object.keys(artistList).reduce((acc, key) => {
            const data = artistList[key]
            if (data.artistName.toLowerCase().includes(targetName.toLowerCase())) {
                const tempResult = {}
                tempResult[`${key}`] = data
                return { ...acc, ...tempResult }
            } else {
                return acc
            }
        }, {})
        return res.json(result)
    })
    .catch(err => res.status(400))
)

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`))