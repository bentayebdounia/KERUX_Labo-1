const { Router } = require("express");
const process = require("../controller/controller.process");
const router = Router();

router.post("/ajouterBon", process.ajouterBon);
router.post("/ajouterProduitFourni", process.ajouterProduitFourni);
router.get("/:id_gnerate", process.getProcessId);
router.put("/modifierProcess/:id_gnerate", process.modifierProcess);
router.get("/a/getbonFournisseur", process.getbonByFournisseur);
router.get(
  "/getBonByNomFournisseur/:nom_fournisseur",
  process.getBon_NomFournisseur
);
router.get("/p/get_ProdFourni", process.getProdFourni);
router.get(
  "/getProdByNomFourniseur/:nom_fournisseur",
  process.getProdByNomFourniseur
);
router.get("/p/getBon", process.getBonBydateHeur);

module.exports = router;
