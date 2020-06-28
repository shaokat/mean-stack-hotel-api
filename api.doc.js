const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Hotel API",
      description: "Hotel API Information",
      contact: {
        name: "Shaokat Hossain",
        email: "shaokatcse@gmail.com"
      },
      servers: ["https://mean-hotel-api.herokuapp.com"]
    }
  },
  // ['.routes/*.js']
  apis: ["api.doc.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Routes
/**
 * @swagger
 * /api/hotels:
 *  get:
 *    description: Use to request all hotels
 *    responses:
 *      '200':
 *        description: A successful response
 */



module.exports = swaggerDocs