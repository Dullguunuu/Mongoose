const { Router } = require("express");
const restaurant = require("../controllers/restaurant.controllers");

const route = Router();

route.get("/restaurants", restaurant.getRestaurants);
route.get("/restaurants/:_id", restaurant.getRestaurantOne);
route.get("/restaurantsbyneighbor/", restaurant.getRestaurantByNeighborHood);

module.exports = route;
