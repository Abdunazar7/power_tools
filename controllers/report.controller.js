const db = require("../config/db.config");

const getShopsByTool = (req, res) => {
  const { toolName } = req.body;

  db.query("CALL getShopsByTool(?)", [toolName], (err, result) => {
    if (err) return res.status(500).json({message: err });
    res.json({
      message: "Shops by tool",
      data: result[0],
    });
  });
};

const getClientsByRentPrice = (req, res) => {
  const { maxPrice } = req.body;

  db.query("CALL getClientsByRentPrice(?)", [maxPrice], (err, result) => {
    if (err) return res.status(500).json({ message: err });
    res.json({
      message: "Clients by rent price",
      data: result[0],
    });
  });
};

const getClientsByDistrictDateTool = (req, res) => {
  const { districtName, startDate, endDate, toolName } = req.body;

  db.query(
    "CALL getClientsByDistrictDateTool(?, ?, ?, ?)",
    [districtName, startDate, endDate, toolName],
    (err, result) => {
      if (err) return res.status(500).json({ message: err });
      res.json({
        message: "Clients by district, date and tool",
        data: result[0],
      });
    }
  );
};

module.exports = {
  getShopsByTool,
  getClientsByRentPrice,
  getClientsByDistrictDateTool,
};
