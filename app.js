const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
require('dotenv').config();
const usersRoutes = require('./routes/users');

const PORT = process.env.PORT || 8000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;


mongoose.connect(
    MONGO_DB_URI,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );
  
  app.use(express.static('./public'));
  app.use(bodyParser.json());

  app.use('/api/users', usersRoutes);

  // handler for 404 - Resource Not Found
app.use((_, res) => {
  res.status(404).send(`The address doesn't exist`);
});

// handler for error 500
app.use((err, _, res) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});

// server creation
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
