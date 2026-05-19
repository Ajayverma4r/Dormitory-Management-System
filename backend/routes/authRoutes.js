const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const pool = require("../config/db");

const router = express.Router();


// REGISTER USER

router.post("/register", async (req, res) => {

  try {

    const {
      username,
      password,
      role,
    } = req.body;

    // CHECK USER

    const existingUser =
      await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
      );

    if (
      existingUser.rows.length > 0
    ) {

      return res.status(400).json({
        message:
          "Username already exists",
      });
    }

    // HASH PASSWORD

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // INSERT USER

    const newUser =
      await pool.query(

        `
        INSERT INTO users
        (
          username,
          password,
          role
        )

        VALUES ($1, $2, $3)

        RETURNING *
        `,

        [
          username,
          hashedPassword,
          role,
        ]
      );

    res.status(201).json({
      message:
        "User registered successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// LOGIN

router.post("/login", async (req, res) => {

  try {

    const {
      username,
      password,
    } = req.body;

    // FIND USER

    const user =
      await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
      );

    if (
      user.rows.length === 0
    ) {

      return res.status(400).json({
        message:
          "Invalid username",
      });
    }

    // CHECK PASSWORD

    const validPassword =
      await bcrypt.compare(
        password,
        user.rows[0].password
      );

    if (!validPassword) {

      return res.status(400).json({
        message:
          "Invalid password",
      });
    }

    // TOKEN

    const token =
      jwt.sign(

        {
          id: user.rows[0].id,
          role: user.rows[0].role,
        },

        "secretkey",

        {
          expiresIn: "1d",
        }
      );

    res.json({

      token,

      user: {

        id: user.rows[0].id,

        username:
          user.rows[0].username,

        role:
          user.rows[0].role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// GET ALL USERS

router.get("/users", async (req, res) => {

  try {

    const users =
      await pool.query(

        `
        SELECT
          id,
          username,
          role

        FROM users

        ORDER BY id ASC
        `
      );

    res.json(users.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// DELETE USER

router.delete("/users/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(

      "DELETE FROM users WHERE id=$1",

      [id]
    );

    res.json({
      message:
        "User deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// UPDATE PASSWORD

router.put(
  "/users/:id/password",

  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { password } =
        req.body;

      // HASH PASSWORD

      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // UPDATE

      await pool.query(

        `
        UPDATE users

        SET password=$1

        WHERE id=$2
        `,

        [
          hashedPassword,
          id,
        ]
      );

      res.json({
        message:
          "Password updated successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

// UPDATE ROLE

router.put(
  "/users/:id/role",

  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { role } =
        req.body;

      await pool.query(

        `
        UPDATE users

        SET role=$1

        WHERE id=$2
        `,

        [
          role,
          id,
        ]
      );

      res.json({
        message:
          "Role updated successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

module.exports = router;