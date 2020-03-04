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

app.get("/", (req, res) => res.render("login", { loginCSS: true }))

app.post("/login", (req, res) => {
  const { name, password } = req.body
  if (name === "A00990152" && password === "password") {
    res.redirect("/artists")
  } else {
    res.status(400)
  }
})

app.use(artistRoutes);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
