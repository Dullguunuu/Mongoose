const { default: mongoose, Schema } = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
    },
    foodPrice: Number,
    categoryId: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { collection: "clFood", timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
