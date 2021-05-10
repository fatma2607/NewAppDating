const path = require("path"); 
const express = require("express");
//hvorfor er der to require express?
const { application } = require("express");
//med appen får vi forskelliige ting
const app = express();
//"Process.env.PORT"= vi vil se på omgivelserne
const PORT = process.env.PORT || 5000; 
//når man kører på serveren får man nogret tilbage
//"BodyParser" = Til mine users
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//Virker som i browseren
const fetch = require("node-fetch");
const fs = require("fs");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Mine controllere
//Til vores ejs
app.get("/", (req, res) => {

    res.render(path.join(__dirname,"./index.html"));
  });

  app.listen(PORT, () =>
  console.log(`Simple Express app listening on port ${PORT}!`)
);

  