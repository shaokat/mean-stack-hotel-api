var mongoose = require('mongoose');
var dburl = process.env.MONGODB_URI || 'mongodb://localhost:27017/meanhotel';
mongoose.set('useCreateIndex', true)
mongoose.connect(dburl, { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected',() => {
    console.log('Mongose connected to '+dburl);

})

mongoose.connection.on('disconnected',() => {
    console.log('Mongose disconnected');
    
})

mongoose.connection.on('error',() => {
    console.log('Mongose connection error '+dburl);
    
})


// MODELS

require('./hotels.model');
require('./user.model');