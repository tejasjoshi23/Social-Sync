const express = require('express');
const app = express()
const port = process.env.port || 5000;
const mongoose = require('mongoose');
const {mongoUrl} = require("./keys")
const cors = require('cors');
const path = require("path")


app.use(cors())
require('./models/model.js')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth.js"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))
mongoose.connect(mongoUrl);


mongoose.connection.on("connected", ()=>{
    console.log("Connected to mongo")
})
mongoose.connection.on("error", ()=>{
    console.log("NOT connected to mongo.")
})
//serving the frontend
app.use(express.static(path.join(__dirname, "./socialsync/build")))

app.get("*", (req, res)=>{
    res.sendFile(
        path.join(__dirname, "./socialsync/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.listen(port, ()=> {
    console.log("Server runs on "+ port)
})



// npx nodemon app.js







/*const http = require('http');

const server = http.createServer((req, res)=>{
console.log('Server Created');
res.end('Working new server with nodemon ')
});

server.listen(5000,"localhost",()=>{
    console.log("server is running on 5000")
})

//npx nodemon app.js - run the commmand

*/
/*

const express = require("express");
const app = express();
const PORT = 5000;
const cors = require('cors');
const data = require('./data.js')

app.use(cors())

app.get('/', (req, res)=>   {
    res.json(data)
})

app.listen(PORT , ()=>{
    console.log("server is run on "+ PORT);
} )
*/