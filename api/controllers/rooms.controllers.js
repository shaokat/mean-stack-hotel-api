var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// GET all rooms for a hotel
module.exports.roomsGetAll = (req, res) => {
  var id = req.params.hotelId;
  console.log('GET rooms for hotelId', id);

  Hotel
    .findById(id)
    .select('rooms')
    .exec((err, doc) => {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        response.message = doc.rooms ? doc.rooms : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

// GET single room for a hotel
module.exports.roomsGetOne = (req, res) => {
  var hotelId = req.params.hotelId;
  var roomId = req.params.roomId;
  console.log('GET roomId ' + roomId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('rooms')
    .exec((err, hotel) => {
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the room
        response.message = hotel.rooms.id(roomId);
        // If the room doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            "message" : "room ID not found " + roomId
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });

};
var _addroom =  (req, res, hotel) => {
  
  hotel.rooms.push({
    type : req.body.type,
    number : parseInt(req.body.number, 10),
    description : req.body.description,
    photos : req.body.photos,
    price : parseFloat(req.body.price)
  });

  hotel.save((err, hotelUpdated) => {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(hotelUpdated.rooms[hotelUpdated.rooms.length - 1]);
    }
  });

};

module.exports.roomsAddOne = (req, res) => {

  var id = req.params.hotelId;

  console.log('POST room to hotelId', id);

  Hotel
    .findById(id)
    .select('rooms')
    .exec((err, doc) => {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("HotelId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      if (doc) {
        _addroom(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};


module.exports.roomsUpdateOne = (req, res) => {
  var hotelId = req.params.hotelId;
  var roomId = req.params.roomId;
  console.log('PUT roomId ' + roomId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('rooms')
    .exec((err, hotel) => {
      var thisroom;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the room
        thisroom = hotel.rooms.id(roomId);
        // If the room doesn't exist Mongoose returns null
        if (!thisroom) {
          response.status = 404;
          response.message = {
            "message" : "room ID not found " + roomId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisroom.type =  req.body.type,
        thisroom.number = parseInt(req.body.number, 10),
        thisroom.description = req.body.description,
        thisroom.photos = req.body.photos,
        thisroom.price = parseFloat(req.body.price)
        hotel.save((err, hotelUpdated) => {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};


module.exports.roomsDeleteOne = (req, res) => {
  var hotelId = req.params.hotelId;
  var roomId = req.params.roomId;
  console.log('PUT roomId ' + roomId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('rooms')
    .exec((err, hotel) => {
      var thisroom;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the room
        thisroom = hotel.rooms.id(roomId);
        // If the room doesn't exist Mongoose returns null
        if (!thisroom) {
          response.status = 404;
          response.message = {
            "message" : "room ID not found " + roomId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        hotel.rooms.id(roomId).remove();
        hotel.save((err, hotelUpdated) => {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};
