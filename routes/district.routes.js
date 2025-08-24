const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware")
const validate = require("../middlewares/validate.middleware");
const { createDistrictSchema, updateDistrictSchema } = require("../validators/district.validator");
const {
  createDistrict,
  getDistricts,
  getDistrict,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/district.controller");

router.post("/", auth, role(["owner"]), validate(createDistrictSchema), createDistrict);
router.get("/", getDistricts);
router.get("/:id", getDistrict);
router.patch("/:id", auth, role(["owner"]), validate(updateDistrictSchema), updateDistrict);
router.delete("/:id", auth, role(["owner"]), deleteDistrict);

module.exports = router;
