import express from "express"

//Backend Server which retrieves info

//Start server
const app = express();
const port = 8000;

app.use("/", express.static("./src/client/")); 

//Get all listings from JSON array of list objects (Home)

let listings = [
  {
    "userName": "myName",
    "title": "Hoodies to Donate",
    "desc": "This hoodie is small and made of cotton",
    "location": "181 Fearing Street, Amherst, MA",
    "postId" : "001"
  },
  {
    "userName": "myName",
    "title": "Tanktop to Donate",
    "desc": "This tanktop is large and made of fleece",
    "location": "161 Orchard Hill Drive, Amherst, MA",
    "postId" : "002"
  }
];
app.get("/listings", (req, res) => {
   res.send([listings])
   console.log(listings);
    // example listing object: {image, description, name}
 });




//Ex. Get all listings saved under a user (Manage Listings/ Saved Listings)
//app.get("/listings/:userId", (req, res) => {
  // {userId} = req.params
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
