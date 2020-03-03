const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const expressHbs = require("express-handlebars");
const app = express();

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

const artistRoutes = require("./routes/artists");

app.get("/", (req, res) => res.send("Hi"))

app.use(artistRoutes);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
