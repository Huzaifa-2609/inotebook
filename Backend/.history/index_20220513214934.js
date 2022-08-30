const connectToMongo = require("./db");
const express = require("express")
const app = express()
const port=9000;

//for declaring that the resultant output will be json
app.use(express.json());

//Available Routes
app.get('/', (req, res) => {
  res.send('hello world i am huzaifa')
})
app.use("/api/auth", require('./routes/auth'));
app.use("/api/Notes", require('./routes/Notes'));
app.listen(port, ()=>{
    console.log(`server is running on port localhost:${port}`)
})
connectToMongo();