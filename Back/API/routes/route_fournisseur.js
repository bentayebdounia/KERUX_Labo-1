const { Router } = require("express");
const fournisseur = require("../controller/controller.fournisseur");
const router = Router();

router.post("/ajouterFournisseur", fournisseur.ajouterFournisseur);
router.post("/ajouetrContact", fournisseur.ajouterContact);
router.put(
  "/modifierFournisseur/:id_fournisseur",
  fournisseur.updateFournisseur
);
router.get(
  "/getFournisseurbyCategorie/:categorie",
  fournisseur.getFournisseurByNom
);
router.get("/getAllFournisseur", fournisseur.getAllFournisseur);
router.get(
  "/getFournisseurByNomCategorie/:nom_fournisseur/:categorie",
  fournisseur.getFournisseurByNomCategorie
);
router.get("/getIdFournisseur/:id_fournisseur", fournisseur.getIdFournisseur);

module.exports = router;
