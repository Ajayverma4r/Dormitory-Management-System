const express = require("express");

const pool = require("../config/db");

const router = express.Router();


// GET ALL BEDS

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM beds ORDER BY id ASC"
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ADD BED

router.post("/", async (req, res) => {

  try {

    let {
      bed_number,
      room,
      floor,
      location,
      status,
      gender_type,
      guest_name,
      emp_id,
      guest_phone,
      check_in,
    } = req.body;

    // UPPERCASE

    bed_number = bed_number.toUpperCase();

    room = room.toUpperCase();

    floor = floor.toUpperCase();

    // VALIDATION

    if (
      !gender_type
    ) {

      return res.status(400).json({
        message:
          "Please select dormitory type",
      });
    }

    // OCCUPIED VALIDATION

    if (status === "occupied") {

      if (
        !guest_name ||
        !emp_id ||
        !guest_phone ||
        !check_in
      ) {

        return res.status(400).json({
          message:
            "All guest details required",
        });
      }
    }

    // AVAILABLE → CLEAR GUEST DATA

    if (status === "available") {

      guest_name = null;

      emp_id = null;

      guest_phone = null;

      check_in = null;
    }

    // CHECK EXISTING BED

    const existingBed =
      await pool.query(

        `
        SELECT *
        FROM beds
        WHERE bed_number=$1
        `,

        [bed_number]
      );

    if (
      existingBed.rows.length > 0
    ) {

      return res.status(400).json({
        message:
          "Bed already exists",
      });
    }

    // INSERT BED

    const newBed =
      await pool.query(

        `
        INSERT INTO beds
        (
          bed_number,
          room,
          floor,
          location,
          status,
          gender_type,
          guest_name,
          emp_id,
          guest_phone,
          check_in
        )

        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10
        )

        RETURNING *
        `,

        [
          bed_number,
          room,
          floor,
          location,
          status,
          gender_type,
          guest_name,
          emp_id,
          guest_phone,
          check_in,
        ]
      );

    res.status(201).json(
      newBed.rows[0]
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// UPDATE BED

router.put("/:id", async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      room,
      floor,
      location,
      status,
      gender_type,
      guest_name,
      emp_id,
      guest_phone,
      check_in,
    } = req.body;

    const updatedBed =
      await pool.query(

        `
        UPDATE beds

        SET
          room = $1,
          floor = $2,
          location = $3,
          status = $4,
          gender_type = $5,
          guest_name = $6,
          emp_id = $7,
          guest_phone = $8,
          check_in = $9

        WHERE id = $10

        RETURNING *
        `,

        [
          room,
          floor,
          location,
          status,
          gender_type,
          guest_name,
          emp_id,
          guest_phone,
          check_in,
          id,
        ]
      );

    res.json(
      updatedBed.rows[0]
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// DELETE BED

router.delete("/:id", async (req, res) => {

  try {

    const { id } =
      req.params;

    await pool.query(

      `
      DELETE FROM beds
      WHERE id = $1
      `,

      [id]
    );

    res.json({
      message:
        "Bed deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;