const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    CategoryName: String,
  },
  {
    collection: "clCategory",
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
