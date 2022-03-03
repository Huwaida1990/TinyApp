const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello!");

});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL]
  const templateVars = { shortURL: req.params.shortURL, longURL};
  res.render("urls_show", templateVars);
});

app.post('/urls',(req,res)=>{
  const longURL = req.body.longURL;

  urlDatabase[generateShortURL()] = longURL;

  res.send('ok')
})

// delete url
app.post('/urls/:shortURL/delete',(req,res)=>{
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect('/urls')
})

app.get("/u/:shortURL", (req, res) => {
  const shorturl = req.params.shortURL;
  const longURL = urlDatabase[shorturl];
  res.redirect(longURL);
});

function generateShortURL() {
  return Math.random().toString(36).substr(2, 6);
}


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

