require('./api/data/db');
const express = require('express');
const app = express();
const routes = require('./api/routes')
const bodyParser = require('body-parser');
app.use(express.json());

app.set('port', 3000);
// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',routes);

const server = app.listen(app.get('port'),()=> {
    const port = server.address().port;
    console.log('Magic happens on port '+ port);
})