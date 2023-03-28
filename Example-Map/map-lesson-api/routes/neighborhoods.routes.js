const { Router } = require("express");
const neighborhoods = require("../controllers/neighborhoods.controllers");

const route = Router();

route.get("/neighborhoods", neighborhoods.getNeighborhoods);
route.get("/neighborhoods/:_id", neighborhoods.getNeighborhoodsOne);

route.post("/currentNeighborHood/", neighborhoods.findCurrentNeighborHood);
route.post("/findAllResInNeighborhood/", neighborhoods.findAllRestaurantsInNeighborhood);
route.post("/findResInDistance", neighborhoods.findRestaurantsInDistance);

module.exports = route;
