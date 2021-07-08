const express                   = require('express');
const morgan                    = require('morgan');

const app                       = express();
const port                      = 4000;

require('dotenv').config();

app.use(morgan('dev'));


app.listen(port, () => { console.log(`Listening on port ${port}`)});