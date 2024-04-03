import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "asdf",
  port: "5432"
});

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

// app.get("/", async (req, res) => {
//   //Write your code here.
//   const result = await db.query("SELECT country_code FROM visited_countries");

//   let countries = [];
//   result.rows.forEach((country) => {
//     countries.push(country.country_code);
//   });
//   console.log(result.rows);
//   res.render("index.ejs", {countries: countries, total: countries.length });
//   db.end();
// });

//INSERT New Country
app.post("/add", async(req, res) => {
  const input = req.body["country"];

  try{
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';"
     [input.toLowerCase()]);  

  const data = result.rows[0];
  const countryCode = data.country_code;

  try{
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
    res.redirect("/")
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country has alreday added, Try again",
    });
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name Doesn't exist, try again",
    });
  }
}

//   if(result.rows.length !== 0){
//     const data = result.rows[0];
//     const countryCode = data.country_code;

//     await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode,]);
//     res.redirect("/");
//   }
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 