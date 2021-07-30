require('./db-connection')();
const express = require('express');
const jobs = require('./route');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API is working...');
});
app.use(`/jobs`, jobs);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`API running @ ${port}`));
