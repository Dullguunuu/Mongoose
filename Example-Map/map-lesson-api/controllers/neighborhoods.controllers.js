const neighborModel = require("../models/neighborhoods.model");
const resModel = require("../models/restaurants.model");

exports.getNeighborhoods = async (req, res) => {
  try {
    const result = await neighborModel.find().limit(5);

    res.json({ status: true, result });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};

exports.getNeighborhoodsOne = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await neighborModel.findOne({ _id });
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.getNeighborhoodsByRes = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await neighborModel.findOne({ _id });
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

//Find the Current Neighborhood
exports.findCurrentNeighborHood = async (req, res) => {
  const { lat, long } = req.body;
  try {
    const result = await neighborModel.findOne({
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
        },
      },
    });

    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

//Find all Restaurants in the Neighborhood
exports.findAllRestaurantsInNeighborhood = async (req, res) => {
  const { lat, long } = req.body;
  try {
    const currentNeighborHood = await neighborModel.findOne({
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
        },
      },
    });

    const result = await resModel.find({
      location: {
        $geoWithin: {
          $geometry: currentNeighborHood.geometry,
        },
      },
    });

    res.json({ status: true, result, count: result.length });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

//Find Restaurants within a Distance $near
exports.findRestaurantsInDistance = async (req, res) => {
  const { lat, long } = req.body;
  try {
    const result = await resModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
          $maxDistance: 500,
        },
      },
    });

    res.json({ status: true, result, count: result.length });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
