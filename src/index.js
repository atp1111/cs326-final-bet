import express from "express"
import pg from "pg"
const {Client} = pg
import dotenv from "dotenv"
dotenv.config()
//Backend Server which retrieves info

//Start server and access secrets from .env
const app = express();
app.use(express.json())
const port = process.env.PORT || 8000;
const dbPort = process.env.DBPORT
const host = process.env.HOST;
const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const uri = process.env.DATABASE_URL;



const client = new Client({
  host: host,
  port: dbPort,
  password: password,
  user: user,
  database: database,
  connectionString: uri,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect((err) => {
  if(err) {
    console.log(err)
  } else {
  console.log("Connected to db")
  }
})

//Dummy JSON Data
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
    "userName": "Default Temp",
    "userID": "0000",
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

//app.get("/listings", (req, res) => {
  //res.send([listings])
  //console.log(listings);
   // example listing object: {image, description, name}
//});


//Get listings stored in database and serve to client
app.get('/listings', async (req, res) => {
  try {
    const result = await client.query('SELECT * from "Listings" ORDER BY "timeCreated" DESC'); 
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/donate', async (req, res) => {
  try {
    console.log(req.body);
    const { username, title, description, location, postId } = req.body;
     const text= 'INSERT INTO "Listings"(username, title, description, location, postId) VALUES($1, $2, $3, $4, $5) RETURNING *;'
     const values= [username, title, description, location, postId]
    
    const result = await client.query(text, values); 
    // const results = { 'results': (result) ? result.rows : null};
    res.redirect( '/' );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Get users stored in database and serve to client
// app.get("/users", (req, res) => {
  //res.send([users])
  //console.log(users);
//});

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * from "Users";'); 
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.delete('/users', async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body;
    const text= `DELETE FROM "Listings" WHERE username='Default';`
    const values= [username]
    const result = await client.query(text); 

    res.redirect( '/' );
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
