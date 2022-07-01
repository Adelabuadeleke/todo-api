const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const todoRoutes = require('./routes/todoRoutes');

const port = 8080;

// express config, middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// set headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ' ');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    next();
});

// Routes
app.use(todoRoutes);

// dataase & server connection
mongoose.connect(process.env.MONGO_DEV,{
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
  })
  .then(response =>{
    app.listen(port, ()=>{
      console.log('server is running:listening on port ' + port);
    })
    console.log('All connections sucessful!')
  }).catch((err)=>{
    console.log('Database connection failed: unable to establish connections')
    console.log(err)
})