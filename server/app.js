const express                   = require('express');
const mongoose                  = require('mongoose');
const morgan                    = require('morgan');

const app                       = express();
const port                      = 4000;

require('dotenv').config();

mongoose.connect(process.env.MONGODATABASE, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

mongoose.connection.on('connected', () => {
    console.log('Connected to databse: ', process.env.MONGODATABASE)
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ', err);
});

// this is a logger
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers', 'Authorization, refresh');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, refresh');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  
    next();
});


app.listen(port, () => { console.log(`Listening on port ${port}`)});