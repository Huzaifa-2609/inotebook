const connectToMongo = require("./db");
const express = require("express")
const app = express()
const port=3000;
// respond with "hello world" when a GET request is made to the homepage
//Available Routes
app.use("/api/auth", require('./routes/auth'));
// app.use("/api/Notes", require('./routes/Notes'));
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(3000, ()=>{
    console.log(`server is running on port https://localhost:${port}`)
})
connectToMongo();