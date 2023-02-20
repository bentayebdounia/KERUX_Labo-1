const { Router } = require("express");
const role = require("../controller/controller.role");
const router = Router();

router.get("/role", role.getRoles);
router.get("/role/id/:id_role", role.getRoleById);
router.get("/role/nom/:nom_role", role.getRoleByNom);
router.post("/AjouterRole", role.postRoles);
router.delete("/deleteRoule/:id_role", role.deleteRoles);

module.exports = router;
