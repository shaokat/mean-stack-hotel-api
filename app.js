require('./api/data/db');
const express = require('express');
const app = express();
const routes = require('./api/routes')
const bodyParser = require('body-parser');
const swaggerDocs = require('./api.doc')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(express.json());

const port = process.env.PORT || 3000

// Extended: https://swagger.io/specification/#infoObject


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',routes);

const server = app.listen(port,()=> {
    //const port = server.address().port;
    console.log('Magic happens on port '+ port);
})