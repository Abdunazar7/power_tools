const router = require("express").Router();
const {
  getShopsByTool,
  getClientsByRentPrice,
  getClientsByDistrictDateTool,
} = require("../controllers/report.controller");

// Body orqali parametrlar beriladi
router.post("/shops-by-tool", getShopsByTool);
router.post("/clients-by-rentprice", getClientsByRentPrice);
router.post("/clients-by-district-date-tool", getClientsByDistrictDateTool);

module.exports = router;
