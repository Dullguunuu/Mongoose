const { Router } = require("express");
const food = require("../controllers/food.controllers");

const route = Router();

route.get("/food", food.getAll);
route.get("/food/:_id", food.getOne);
route.post("/food", food.createFood);
route.put("/food/:_id", food.updateFood);
route.delete("/food/:_id", food.deleteFood);

module.exports = route;
