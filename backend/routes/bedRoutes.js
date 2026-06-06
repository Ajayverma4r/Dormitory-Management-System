const express = require("express");

const pool = require("../config/db");

const router = express.Router();


// GET ALL BEDS

// GET BED HISTORY

router.get("/history", async (req, res) => {

  try {

   const {
  fromDate,
  toDate,
  empId,
  guestName,
  department,
  bedNumber,
  stayStatus,
} = req.query;

    let query = `
      SELECT *
      FROM bed_history
      WHERE 1=1
    `;

    const values = [];

    if (fromDate) {

      values.push(fromDate);

      query += `
        AND check_in >= $${values.length}
      `;
    }

    if (toDate) {

      values.push(toDate);

      query += `
        AND check_in <= $${values.length}
      `;
    }
    if (empId) {

  values.push(`%${empId}%`);

  query += `
    AND emp_id ILIKE $${values.length}
  `;
}

if (guestName) {

  values.push(`%${guestName}%`);

  query += `
    AND guest_name ILIKE $${values.length}
  `;
}

if (department) {

  values.push(`%${department}%`);

  query += `
    AND department ILIKE $${values.length}
  `;
}

if (bedNumber) {

  values.push(`%${bedNumber}%`);

  query += `
    AND bed_number ILIKE $${values.length}
  `;
}

if (stayStatus) {

  values.push(stayStatus);

  query += `
    AND stay_status = $${values.length}
  `;
}

    query += `
      ORDER BY id DESC
    `;

    const result =
      await pool.query(
        query,
        values
      );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

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
  location_type,
  status,
  gender_type,
  guest_name,
  emp_id,
  guest_phone,
  check_in,
  occupant_gender,
  department,
  fan,
  mattress,
  plywood,
} = req.body;

    // UPPERCASE

    bed_number = bed_number.toUpperCase();

    room = room.toUpperCase();

    floor = floor.toUpperCase();


    // VALIDATION

if (!gender_type) {

  return res.status(400).json({
    message:
      "Please select dormitory type",
  });
}

// MEN DORMITORY VALIDATION

if (
  status === "occupied" &&
  gender_type === "boys" &&
  occupant_gender === "female"
) {

  return res.status(400).json({
    message:
      "Female occupants cannot be assigned to Men Dormitory",
  });
}

// WOMEN DORMITORY VALIDATION

if (
  status === "occupied" &&
  gender_type === "girls" &&
  occupant_gender === "male"
) {

  return res.status(400).json({
    message:
      "Male occupants cannot be assigned to Women Dormitory",
  });
}

    // OCCUPIED VALIDATION

    if (status === "occupied") {

      if (
        !guest_name ||
        !emp_id ||
        !guest_phone ||
        !check_in ||
        !occupant_gender
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
    WHERE
      bed_number = $1
      AND room = $2
      AND floor = $3
      AND location_type = $4
    `,
    [
      bed_number,
      room,
      floor,
      location_type,
    ]
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
  location_type,
  status,
  gender_type,
  guest_name,
  emp_id,
  guest_phone,
  check_in,
  occupant_gender,
  department,
  fan,
  mattress,
  plywood
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
  $10,
  $11,
  $12,
  $13,
  $14,
  $15,
  $16
)

RETURNING *
        `,

       [
  bed_number,
  room,
  floor,
  location,
  location_type,
  status,
  gender_type,
  guest_name,
  emp_id,
  guest_phone,
  check_in,

  occupant_gender,

  department,

  fan,

  mattress,

  plywood,
]

      );

       // INSERT INTO BED HISTORY

if (status === "occupied") {

  await pool.query(

    `
    INSERT INTO bed_history
(
  bed_id,
  bed_number,
  guest_name,
  emp_id,
  guest_phone,
  department,
  fan,
  mattress,
  plywood,
  check_in,
  stay_status,
  location_type
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
  $10,
  $11,
  $12
)
    `,

    [
  newBed.rows[0].id,
  bed_number,
  guest_name,
  emp_id,
  guest_phone,
  department,
  fan,
  mattress,
  plywood,
  check_in,
  "active",
  location_type
]
  );
}

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
const existingBed = await pool.query(
  `
  SELECT *
  FROM beds
  WHERE id = $1
  `,
  [id]
);

if (existingBed.rows.length === 0) {
  return res.status(404).json({
    message: "Bed not found",
  });
}

const oldBed = existingBed.rows[0];



    const {
      room,
      floor,
      location,
      status,
      gender_type,
      occupant_gender,
      guest_name,
      emp_id,
      guest_phone,
      check_in,
      department,
      fan,
      mattress,
      plywood,
      maintenance_fan,
maintenance_mattress,
maintenance_plywood,
maintenance_bed,
maintenance_electrical,
maintenance_cleaning,
maintenance_others,
maintenance_comment,
    } = req.body;

    // MEN DORMITORY VALIDATION

if (
  status === "occupied" &&
  gender_type === "boys" &&
  occupant_gender === "female"
) {

  return res.status(400).json({
    message:
      "Female occupants cannot be assigned to Men Dormitory",
  });
}

// WOMEN DORMITORY VALIDATION

if (
  status === "occupied" &&
  gender_type === "girls" &&
  occupant_gender === "male"
) {

  return res.status(400).json({
    message:
      "Male occupants cannot be assigned to Women Dormitory",
  });
}
  if (
  status === "occupied" &&
  !occupant_gender
) {

  return res.status(400).json({
    message: "Please select gender",
  });
}

    // AVAILABLE -> OCCUPIED
if (
  oldBed.status === "available" &&
  status === "occupied"
) {

  await pool.query(
    `
    INSERT INTO bed_history
    (
      bed_id,
      bed_number,
      guest_name,
      emp_id,
      guest_phone,
      department,
      fan,
      mattress,
      plywood,
      check_in,
      stay_status,
      location_type
    )
   VALUES
(
  $1,$2,$3,$4,$5,
  $6,$7,$8,$9,$10,$11,$12
)
    `,
    [
  oldBed.id,
  oldBed.bed_number,
  guest_name,
  emp_id,
  guest_phone,
  department,
  fan,
  mattress,
  plywood,
  check_in,
  "active",
  oldBed.location_type
]
  );
}
// OCCUPIED -> AVAILABLE
if (
  oldBed.status === "occupied" &&
  status === "available"
) {

  await pool.query(
    `
    UPDATE bed_history
    SET
      check_out = CURRENT_DATE,
      stay_status = 'completed'
    WHERE
      bed_id = $1
      AND stay_status = 'active'
    `,
    [id]
  );
}

// OCCUPIED -> OCCUPIED

if (
  oldBed.status === "occupied" &&
  status === "occupied"
) {

  // SAME EMPLOYEE

  if (oldBed.emp_id === emp_id) {

    await pool.query(
      `
      UPDATE bed_history
      SET
        guest_name = $1,
        guest_phone = $2,
        department = $3,
        fan = $4,
        mattress = $5,
        plywood = $6,
        check_in = $7
      WHERE
        bed_id = $8
        AND stay_status = 'active'
      `,
      [
        guest_name,
        guest_phone,
        department,
        fan,
        mattress,
        plywood,
        check_in,
        id,
      ]
    );

  }

  // NEW EMPLOYEE

  else {

    // CLOSE OLD RECORD

    await pool.query(
      `
      UPDATE bed_history
      SET
        check_out = CURRENT_DATE,
        stay_status = 'completed'
      WHERE
        bed_id = $1
        AND stay_status = 'active'
      `,
      [id]
    );

    // CREATE NEW RECORD

await pool.query(
  `
  INSERT INTO bed_history
  (
    bed_id,
    bed_number,
    guest_name,
    emp_id,
    guest_phone,
    department,
    fan,
    mattress,
    plywood,
    check_in,
    stay_status,
    location_type
  )
  VALUES
  (
    $1,$2,$3,$4,$5,
    $6,$7,$8,$9,$10,$11,$12
  )
  `,
  [
    id,
    oldBed.bed_number,
    guest_name,
    emp_id,
    guest_phone,
    department,
    fan,
    mattress,
    plywood,
    check_in,
    "active",
    oldBed.location_type
  ]
);

  }
}


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

 check_in = $9,

occupant_gender = $10,

department = $11,

  fan = $12,
mattress = $13,
plywood = $14,

maintenance_fan = $15,
maintenance_mattress = $16,
maintenance_plywood = $17,
maintenance_bed = $18,
maintenance_electrical = $19,
maintenance_cleaning = $20,
maintenance_others = $21,
maintenance_comment = $22

WHERE id = $23


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

  occupant_gender,

  department,

  fan,

  mattress,

  plywood,

  maintenance_fan,

  maintenance_mattress,

  maintenance_plywood,

  maintenance_bed,

  maintenance_electrical,

  maintenance_cleaning,

  maintenance_others,

  maintenance_comment,

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