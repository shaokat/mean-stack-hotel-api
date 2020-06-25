const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

const runGeoQuery = (req, res) => {
    console.log(parseFloat(req.query.lng), parseFloat(req.query.lat))
 Hotel
 .aggregate([
    { 
          "$geoNear": {
              "near": {
                   "type": "Point",
                   "coordinates": [parseFloat(req.query.lng), parseFloat(req.query.lat)]
               },
               "distanceField": "distance",
               "maxDistance": 2000,
               "spherical": true
           }
       
      }
  ],
  (err, docs) => {
      if(err){
          console.log(err);
          res
            .status(500)
            .json(err)
      }
      else{
        res
          .status(200)
          .json(docs);
      }     
  });      
}

module.exports.hotelsGetAll = (req, res)=>{
    let offset = 0;
    let count = 5;
    let maxCount = 10;
    
    if(req.query && req.query.lat && req.query.lng){
        console.log("geo")
        runGeoQuery(req, res)
        console.log("geo")
        return

    }
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10)

    }
    console.log("offset "+offset)

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        
    }

    if (isNaN(offset)|| isNaN(count)){
        res
            .status(400)
            .json({"message" : "If supplied in querystring count and offset should be numbers"})
            return;
    }
    if(count > maxCount){
        res
            .status(400)
            .json({
                "message" : "count limit of 10 exceeded"
            })
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec((err,hotels)=>{
            if(err){
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);

            }else{
                console.log("Found hotels ", hotels.length);
                 res
                    .status(200)
                    .json(hotels);
            }
            
        });
};

module.exports.hotelsGetOne = (req, res) => {
    const hotelId = req.params.hotelId;
    console.log("GET hotelId ",hotelId)

    Hotel
        .findById(hotelId)
        .exec((err, doc) => {
            if(err){
                console.log("Error finding hotel")
                res
                    .status(500)
                    .json(err);
            }else if(!doc){
                res
                    .status(404)
                    .json({
                        "message" : "Hotel ID not found"
                    });
            }else{
                res
                .status(200)
                .json(doc)
            }
            
        })
}
const _splitArray = (input) =>  {
    var output;
    if (input && input.length > 0) {
      output = input.split(",");
    } else {
      output = [];
    }
    return output;
  };

module.exports.hotelsAddOne = (req, res) =>{
    console.log(req.body)
    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
              address : req.body.address,
              coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
          }, (err, hotel) => {
            if(err){
                console.log("Error creating hotel");
                res
                   .status(400)
                   .json(err);
            }else{
                console.log("Hotel created", hotel);
                res
                    .status(201) 
                    .json(hotel);
            }

        })

};

module.exports.hotelsUpdateOne = (req, res) => {
    const hotelId = req.params.hotelId;
    console.log("GET hotelId ",hotelId)

    Hotel
    .findById(hotelId)
    .select('-reviews -rooms')
    .exec((err, hotel) => {
      if (err) {
        console.log("Error finding hotel");
        res
          .status(500)
          .json(err);
          return;
      } else if(!hotel) {
        console.log("HotelId not found in database", hotelId);
        res
          .status(404)
          .lson({
            "message" : "Hotel ID not found " + hotelId
          });
          return;
      }

      hotel.name = req.body.name;
      hotel.description = req.body.description;
      hotel.stars = parseInt(req.body.stars,10);
      hotel.services = _splitArray(req.body.services);
      hotel.photos = _splitArray(req.body.photos);
      hotel.currency = req.body.currency;
      hotel.location = {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      hotel
        .save((err, hotelUpdated) => {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};

module.exports.hotelsDeleteOne = (req, res) => {
    var hotelId = req.params.hotelId;
  
    Hotel
      .findByIdAndRemove(hotelId)
      .exec((err, location) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          console.log("Hotel deleted, id:", hotelId);
          res
            .status(204)
            .json();        
        }
      });
  };
  