//Backend Server which retrieves info
import express from "express"
import pg from "pg"
import expressSession from "express-session" //manage session state
import passport from "passport"              //handles authentication
import LocalStrategy from "passport-local"   //username/password strategy
import minicrypt from "./miniCrypt"

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
const mc = new minicrypt();

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

const session = {
  secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
  resave : false,
  saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
  async (username, password, done) => {
if (!findUser(username)) {
    // no such user
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { 'message' : 'Wrong username' });
}
if (!validatePassword(username, password)) {
    // invalid password
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { 'message' : 'Wrong password' });
}
// success!
// should create a user object here, associated with a unique identifier
return done(null, username);
  });

app.use("/", express.static("./src/client/")); 
app.use("/profile", express.static("./src/client/profile"));
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

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

//Get posts from database that match passed in username
app.post('/mylistings', async (req, res) => {
  try {
    const username = req.body.username;
    const text = `SELECT * from "Listings" WHERE username='` + username + `' ORDER BY "timecreated" DESC LIMIT 1`; //LIMIT 1? 
    console.log(text)
    const result = await client.query(text); 
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

//Parse data from donate page to update post in database
app.post('/update', async (req, res) => {
  try {
    console.log(req.body);
    const { username, title, description, location, postId, type, image, timecreated, condition, size, year, donateby } = req.body;
    const text= `UPDATE "Listings" SET 
        username = $1,
        title = $2,
        description = $3,
        location = $4,
        timecreated = $5,
        condition = $6,
        size = $7,
        year = $8,
        image = $9,
        type = $10,
        donateby = $11
    WHERE postid = $12;`;
    const values= [username, title, description, location, timecreated, condition, size, year, image, type, donateby, postId]
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
    const username = req.body.username;
    const text= `DELETE FROM "Listings" WHERE username='` + username + `';`
    console.log(text); 
    const result = await client.query(text); 
    res.redirect( '/' );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
