//Backend Server which retrieves info
import express from "express"
import pg from "pg"
const {Client} = pg
import dotenv from "dotenv"
dotenv.config()

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

//Connect to database
client.connect((err) => {
  if(err) {
    console.log(err)
  } else {
  console.log("Connected to db")
  }
})

app.use("/", express.static("./src/client/")); 
app.use("/profile", express.static("./src/client/profile"));

//Get listings stored in database and serve to client
app.get('/listings', async (req, res) => {
  try {
    const result = await client.query('SELECT * from "Listings" ORDER BY "timecreated" DESC'); 
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Parse data from donate page to create post in database
app.post('/donate', async (req, res) => {
  try {
    console.log(req.body);
    const { username, title, description, location, postId, type, image, timecreated, condition, size, year, donateby } = req.body;
     const text= 'INSERT INTO "Listings"(username, title, description, location, postId, type, image, timecreated, condition, size, year, donateby) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;'
     const values= [username, title, description, location, postId, type, image, timecreated, condition, size, year, donateby]
    
    const result = await client.query(text, values); 
    res.redirect( '/' );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Get users stored in database and serve to client
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

//Delete listings stored in database under the current user's name
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
