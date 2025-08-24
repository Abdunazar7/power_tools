const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
const { createShopSchema, updateShopSchema } = require("../validators/shop.validator");
const {
  createShop,
  getShops,
  getShop,
  updateShop,
  deleteShop,
} = require("../controllers/shop.controller");

router.post("/", auth, role(["owner"]), validate(createShopSchema), createShop);
router.get("/", getShops);
router.get("/:id", getShop);
router.patch("/:id", auth, role(["owner"]), validate(updateShopSchema), updateShop);
router.delete("/:id", auth, role(["owner"]), deleteShop);

module.exports = router;
