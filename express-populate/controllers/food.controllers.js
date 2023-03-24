const Food = require("../models/food.model");

exports.getAll = async (req, res) => {
  try {
    const result = await Food.find({}).populate("categoryId");
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.getOne = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await Food.findById({ _id }).populate("categoryId");
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.createFood = async (req, res) => {
  try {
    const result = await (await Food.create(req.body)).populate("categoryId");
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.updateFood = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await Food.findByIdAndUpdate({ _id }, req.body, { new: true, }).populate("categoryId");
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};

exports.deleteFood = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await Food.deleteOne({ _id });
    res.json({ status: true, result });
  } catch (err) {
    res.json({ status: false, message: err });
  }
};
