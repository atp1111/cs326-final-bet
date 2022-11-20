import express from "express"
import mysql from "mysql";

//Backend Server which retrieves info

//Start server
const app = express();
const port = process.env.PORT || 8000;

var pool = mysql.createConnection({
  host: "ec2-54-204-56-171.compute-1.amazonaws.com",
  user: "mkhtopjnugvikz",
  password: "13684de6d531b341061eee9bcc227e1ef8d183df1014c836153d9df531b3240c",
  database: "d7g7bo1rdppcn1",
  port: "5432"
});

//await pool.connect(function(err) {
  //console.log("Connected!");
//});

//Get all listings from JSON array of list and user objects (Home)
let listings = [
  {
    "userName": "Chuchu",
    "title": "Hoodies to Donate",
    "desc": "This hoodie is small and made of cotton",
    "location": "181 Fearing Street, Amherst, MA",
    "postId" : "001"
  },
  {
    "userName": "Renuka",
    "title": "Tanktop to Donate",
    "desc": "This tanktop is large and made of fleece",
    "location": "161 Orchard Hill Drive, Amherst, MA",
    "postId" : "002"
  }
];

let users = [
  {
    "userName": "Default User",
    "userID": "1000",
    "email": "default@umass.edu",
    "location": "default",
  },
  {
    "userName": "Chuchu",
    "userID": "1001",
    "email": "cuikoro@umass.edu",
    "location": "181 Fearing Street, Amherst, MA",
  },
  {
    "userName": "Renuka",
    "userID": "1001",
    "email": "cuikoro@umass.edu",
    "location": "161 Orchard Hill Drive, Amherst, MA",
  }
];

app.use("/", express.static("./src/client/")); 
app.use("/profile", express.static("./src/client/profile"));

app.get("/listings", (req, res) => {
  res.send([listings])
  //console.log(listings);
   // example listing object: {image, description, name}
});

/*app.get('/listings', async (req, res) => {
  try {
    const client = await pool.connect();
    console.log(pool);
    const result = await client.query('SELECT * FROM Listings'); 
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/listings', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})*/

 app.get("/users", (req, res) => {
  res.send([users])
  console.log(users);
});

//TODO: Temp Database Table, Edit later/ Adapt for Listings/Users
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table'); //change sql query
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

//Ex. Get all listings saved under a user (Manage Listings/ Saved Listings)
//app.get("/listings/:userId", (req, res) => {
  // {userId} = req.params
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
