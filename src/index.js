import express from "express"

//Backend Server which retrieves info

//Start server
const app = express();
const port = 8000;

app.use("/", express.static("./src/client/")); 

//Get all listings from JSON array of list objects (Home)

app.get("/listings", (req, res) => {
   res.send([listings])
   console.log(res.send([listings]));
    // example listing object: {image, description, name}
 });




//Ex. Get all listings saved under a user (Manage Listings/ Saved Listings)
//app.get("/listings/:userId", (req, res) => {
  // {userId} = req.params
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
