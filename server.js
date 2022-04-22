const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
 
const app = express();
const port = process.env.PORT || 5000;
//check
app.use(express.json());
app.use(cors());



const uri = process.env.ATLAS_URI ;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const postRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');


app.use('/posts', postRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;
module.exports.handler=serverless(app);
