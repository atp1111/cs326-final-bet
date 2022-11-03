import express from "express"

//Start server
const app = express();
const port = 8000;

app.use("/", express.static("./src/client/")); 

// app.get("/listings", (req, res) => {
//   res.send([listings])
    // example listing object: {image, description, name}
// })

//app.get("/listings/:userId", (req, res) => {
  // {userId} = req.params
// })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
