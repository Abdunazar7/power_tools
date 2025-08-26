const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware")
const validate = require("../middlewares/validate.middleware");
const { createToolSchema, updateToolSchema } = require("../validators/tool.validator");
const {
  createTool,
  getTools,
  getTool,
  updateTool,
  deleteTool,
} = require("../controllers/tool.controller");

router.post("/", auth, role(["owner", "admin"]), validate(createToolSchema), createTool);
router.get("/", getTools);
router.get("/:id", getTool);
router.patch("/:id", auth, role(["owner", "admin"]), validate(updateToolSchema), updateTool);
router.delete("/:id", auth, role(["owner", "admin"]), deleteTool);

module.exports = router;
