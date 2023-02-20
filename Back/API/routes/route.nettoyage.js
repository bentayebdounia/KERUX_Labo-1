const { Router } = require("express");
const process = require("../controller/controller.nettoyage");
const router = Router();

router.post("/ajouterNettoyage", process.ajouterProcessNettoyage);
router.put(
  "/ajouterNettoyageEnStock/:id_enregistrement",
  process.modifierProcessNettoyage
);
router.get("/getIdEnregistrement/:id_gnerate", process.getProcessId);
router.get("/getProcessByDateHeure", process.getProcessByDateHeure);
router.get(
  "/getProcessByEtapes_categorie/:categorie",
  process.getProcessByEtapes_categorie
);
router.get(
  "/getProcessByEtapes_produit/:nom_produit",
  process.getProcessByEtapes_produit
);
router.get(
  "/getProcessByEtapes_idGnerate/:id_gnerate",
  process.getProcessByEtapes_idGnerate
);

router.get("/getActuelle", process.getProduitEnAttente);
router.get("/actualStock", process.getProduitEnStock);

router.get("/getEnregistrementTble", process.getProcessEnrgTble);
router.get("/getNettoyageTble", process.getProcessNetTble);

module.exports = router;
