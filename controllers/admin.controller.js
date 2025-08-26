const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin login
const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM admin WHERE email = ? AND is_active = TRUE";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) {
      return res.status(401).json({ message: "Admin not found or inactive" });
    }

    const admin = result[0];

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        role: "admin",
        is_creator: admin.is_creator
      },
      process.env.JWT_SECRET_KEY || "nimadur",
      { expiresIn: "2h" }
    );

    res.json({
      message: "Welcome Admin",
      token,
      admin: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        phone_number: admin.phone_number,
        is_creator: admin.is_creator
      }
    });
  });
};

// Create
const createAdmin = async (req, res) => {
  try {
    const { full_name, email, password, phone_number, is_active, is_creator } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [full_name, email, hashedPassword, phone_number, is_active, is_creator],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({
          id: result.insertId,
          message: "Admin created successfully",
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
const getAdmins = (req, res) => {
  db.query("SELECT * FROM admin", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Get One
const getAdmin = (req, res) => {
  db.query(
    "SELECT * FROM admin WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (!result.length)
        return res.status(404).json({ message: "Admin not found" });
      res.json(result[0]);
    }
  );
};

// Update
const updateAdmin = (req, res) => {
  const fields = req.body;
  const keys = Object.keys(fields);

  if (!keys.length)
    return res.status(400).json({ message: "Nothing to update" });

  const setClause = keys.map((k) => `${k}=?`).join(", ");
  const values = keys.map((k) => fields[k]);

  const sql = `UPDATE admin SET ${setClause} WHERE id=?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Admin updated", affectedRows: result.affectedRows });
  });
};

// Delete
const deleteAdmin = (req, res) => {
  db.query("DELETE FROM admin WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Admin deleted", affectedRows: result.affectedRows });
  });
};

module.exports = { createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin, loginAdmin };
