const { Router } = require("express");
const enregistrement = require("../controller/controller.enregistrement");
const router = Router();

router.post(
  "/ajouterEnregistremet",
  enregistrement.ajouterProcessEnregistrement
);
router.put(
  "/ajouterEnregEnStock/:id_enregistrement",
  enregistrement.modifierProcessEnregistrement
);
router.get("/getProcessByDateHeure", enregistrement.getProcessByDateHeure);
router.get(
  "/getProcessByEtapes_categorie/:categorie",
  enregistrement.getProcessByEtapes_categorie
);
router.get(
  "/getProcessByEtapes_produit/:nom_produit",
  enregistrement.getProcessByEtapes_produit
);
router.get(
  "/getProcessByEtapes_idGnerate/:id_gnerate",
  enregistrement.getProcessByEtapes_idGnerate
);

module.exports = router;
