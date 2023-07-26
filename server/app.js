const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const allrouters = require('./routes/index');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const allowedOrigins = ['http://localhost:3000'];

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use('/api', allrouters);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', (error) => {
    console.log(`Error : ${error}`);
  });

app.listen(4000, () => console.log('listening to port 4000'));
