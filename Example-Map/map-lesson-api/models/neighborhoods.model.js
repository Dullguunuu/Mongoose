const { default: mongoose } = require("mongoose");

const neighborhoodSchema = new mongoose.Schema(
  {
    name: String,
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Polygon"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [[[Number]]],
        required: true,
      },
    },
  },
  { collection: "neighborhoods" }
);

const Neighborhood = mongoose.model("Neighborhood", neighborhoodSchema);
module.exports = Neighborhood;
