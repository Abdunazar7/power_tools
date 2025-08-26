const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
const { createOrderSchema, updateOrderSchema } = require("../validators/orders.validator");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");

router.post("/", auth, role(["owner", "client", "admin"]), validate(createOrderSchema), createOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrder);
router.patch("/:id", auth, role(["owner", "admin"]), validate(updateOrderSchema), updateOrder);
router.delete("/:id", auth, role(["owner", "admin"]), deleteOrder);

module.exports = router;
