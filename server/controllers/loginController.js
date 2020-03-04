exports.loginPage = (req, res) => res.render("login", { loginCSS: true })

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === "A00990152" && password === "password") {
    res.redirect("/artists");
  } else {
    res.status(400).redirect("/login");
  }
};
