const { Router } = require("express");
const entrepot = require("../controller/controller.entrepot");
const router = Router();

router.post("/ajouterEntrepot", entrepot.ajouterEntrepot);
router.put("/updateEntrepot/:id_entrepot", entrepot.updateEntrepot);
router.get("/getEntrepot/", entrepot.getEntrepot);
router.get("/getAllEntrepot/", entrepot.getAllEntrepot);
router.get("/getNomEntrepotById/:id_entrepot", entrepot.getNom_entrepotById);



module.exports = router;
