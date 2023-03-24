const express = require("express");
const cors = require("cors");
const mongooose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");

dotenv.config();

mongooose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();

const port = 9000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Success" });
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
