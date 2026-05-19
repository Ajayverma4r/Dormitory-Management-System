const express = require("express");

const cors = require("cors");

require("dotenv").config();

const authRoutes =
require("./routes/authRoutes");

const bedRoutes =
require("./routes/bedRoutes");

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/beds", bedRoutes);

app.use("/api/auth", authRoutes);


// TEST ROUTE

app.get("/", (req, res) => {

  res.send("Backend Server Running");
});


// PORT

const PORT =
process.env.PORT || 5000;


// START SERVER

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});