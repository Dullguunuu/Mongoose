const resModel = require("../models/restaurants.model");

exports.getRestaurants = async (req, res) => {
  try {
    const result = await resModel.find().limit(5);

    res.json({ status: true, result });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};

exports.getRestaurantOne = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await resModel.findOne({ _id });
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.getRestaurantByNeighborHood = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await resModel.findOne({ _id });
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.getRestaurantByNeighborHood = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await resModel.findOne({ _id });
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
