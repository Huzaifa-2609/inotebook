const connectToMongo=require("./db");
const express = require('express')
const app = express()
const port=80;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(port, ()=>{
    console.log(`server is running on port https://localhost:${port}`)
})
connectToMongo();