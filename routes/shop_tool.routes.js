const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
const { createShopToolSchema, updateShopToolSchema } = require("../validators/shop_tool.validator");
const {
  createShopTool,
  getShopTools,
  getShopTool,
  updateShopTool,
  deleteShopTool,
} = require("../controllers/shop_tool.controller");

router.post("/", auth, role(["owner", "admin"]), validate(createShopToolSchema), createShopTool);
router.get("/", getShopTools);
router.get("/:id", getShopTool);
router.patch("/:id", auth, role(["owner", "admin"]), validate(updateShopToolSchema), updateShopTool);
router.delete("/:id", auth, role(["owner", "admin"]), deleteShopTool);

module.exports = router;
