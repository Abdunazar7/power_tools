const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
const { createAdminSchema, updateAdminSchema } = require("../validators/admin.validator");
const {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

router.post("/", auth, role(["owner"]), validate(createAdminSchema), createAdmin);
router.get("/", auth, getAdmins);
router.get("/:id", auth, getAdmin);
router.patch("/:id", auth, role(["owner"]), validate(updateAdminSchema), updateAdmin);
router.delete("/:id", auth, role(["owner"]), deleteAdmin);

module.exports = router;
