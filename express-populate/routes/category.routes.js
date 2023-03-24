const { Router } = require("express");
const category = require("../controllers/category.controllers");

const route = Router();

route.get("/category", category.getAll);
route.get("/category/:_id", category.getOne);
route.post("/category", category.createCategory);
route.put("/category/:_id", category.updateCategory);
route.delete("/category/:_id", category.deleteCategory);

module.exports = route;
