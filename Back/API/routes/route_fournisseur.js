const { Router } = require("express");
const fournisseur = require("../controller/controller.fournisseur");
const router = Router();

router.post("/ajouterFournisseur", fournisseur.ajouterFournisseur);
router.post("/ajouetrContact", fournisseur.ajouterContact);
router.get(
  "/getFournisseurbyCategorie/:categorie",
  fournisseur.getFournisseurByNom
);
router.get("/getAllFournisseur", fournisseur.getAllFournisseur);
router.get(
  "/getFournisseurByNomCategorie/:nom_fournisseur/:categorie",
  fournisseur.getFournisseurByNomCategorie
);

module.exports = router;
