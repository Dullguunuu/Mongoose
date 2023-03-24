const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  console.log("Hi middleware");

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Хэрэглэгчийн token оруулах шаардлагатай.",
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Хэрэглэгчийн token буруу, эсвэл идэвхигүй байна.",
    });
  }
  return next();
};

module.exports = verifyToken;
