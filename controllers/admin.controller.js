const db = require("../config/db.config");

// Create
const createAdmin = (req, res) => {
  const { full_name, email, password, phone_number, is_active, is_creator } =
    req.body;
  const sql = `INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [full_name, email, password, phone_number, is_active, is_creator],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, message: "Admin created" });
    }
  );
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

module.exports = { createAdmin, getAdmins, getAdmin, updateAdmin, deleteAdmin };
