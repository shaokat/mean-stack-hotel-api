const express = require('express');
let router = express.Router();

const ctrlHotels = require('../controllers/hotels.controllers');
const ctrlReviews = require('../controllers/reviews.controllers');
const ctrlRooms = require('../controllers/rooms.controllers');
const ctrlUser = require('../controllers/users.controllers');
router
  .route('/hotels')
  .get(ctrlUser.authenticate, ctrlHotels.hotelsGetAll)
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
  .post(ctrlUser.authenticate,ctrlReviews.reviewsAddOne);

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

//Authentication
router
    .route('/users/register')
    .post(ctrlUser.register);
router
    .route('/users/login')
    .post(ctrlUser.login);

module.exports = router;