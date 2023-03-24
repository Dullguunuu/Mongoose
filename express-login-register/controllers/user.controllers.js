const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(500)
      .send({ status: false, message: "Medeelelee buren oruulna uu" });
    return;
  }

  const hashedPass = await bcrypt.hash(password, 10);
  if (hashedPass) {
    const newUser = new userModel({
      email,
      password: hashedPass,
    });

    const result = await newUser.save();

    if (result) {
      res.status(200).send({
        status: true,
        message: "Amjilttai hadgalalgdlaa",
      });
      return;
    } else {
      res.status(500).send({
        status: false,
        message: "Hadgalahad aldaa garlaa",
      });
      return;
    }
  } else {
    res.status(500).send({
      status: false,
      message: "Password amjilttai encrypt hiigeegui bna",
    });
    return;
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(500)
      .send({ status: false, message: "Medeelelee buren oruulna uu" });
    return;
  }

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "2h",
    });
    res
      .status(200)
      .send({ status: true, data: user, message: "Success", token });
    return;
  } else {
    res.status(400).send({
      status: false,
      message: "user oldsongui ee, nuuts ug taarahgui bna",
    });
    return;
  }
};

exports.getAll = async (req, res) => {
  // console.log(req.user);
  const { user } = req;

  console.log("getall", user);

  if (!user) {
    res.status(500).send({
      status: false,
      message: "Token-tei hereglegch bish bna",
    });
    return;
  }

  const result = await userModel.find({});

  if (result) {
    res.status(200).send({
      status: true,
      result,
    });
    return;
  } else {
    res.status(500).send({
      status: false,
      message: "Baazad hereglegch bhgui bna",
    });
    return;
  }
};
