const express = require('express');
let router = express.Router();

const ctrlHotels = require('../controllers/hotels.controllers');
const ctrlReviews = require('../controllers/reviews.controllers');
const ctrlRooms = require('../controllers/rooms.controllers');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);


// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

//rooms routes

router
.route('/hotels/:hotelId/rooms')
.get(ctrlRooms.roomsGetAll)
.post(ctrlRooms.roomsAddOne);

router
  .route('/hotels/:hotelId/rooms/:roomId')
  .get(ctrlRooms.roomsGetOne)
  .put(ctrlRooms.roomsUpdateOne)
  .delete(ctrlRooms.roomsDeleteOne);

module.exports = router;