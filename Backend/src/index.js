require('dotenv').config();
const cors = require('cors');
const express = require('express');
const user = require('./routes/user');
const schedule = require('./routes/schedule');
const meetingSetting = require('./routes/meetingSetting');
const meetings = require('./routes/meetings');
const db = require('./config/db');


const app = express();
app.use(cors());

// checkDatabaseConnection();
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

app.use(express.json());

app.use('', user);
app.use('', schedule);
app.use('', meetingSetting);
app.use('', meetings);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
