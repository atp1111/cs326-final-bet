import express from "express"

//Backend Server which retrieves info

//Start server
const app = express();
const port = 8000;

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
    "userName": "Chuchu",
    "userID": "1000",
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

 app.get("/users", (req, res) => {
  res.send([users])
  console.log(users);
});

//Ex. Get all listings saved under a user (Manage Listings/ Saved Listings)
//app.get("/listings/:userId", (req, res) => {
  // {userId} = req.params
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
