const { Router } = require("express");
const produit = require("../controller/controller.produit");
const router = Router();

router.post("/ajouterCategorie", produit.postCategorie);
router.post("/ajouterProduit", produit.postProduit);
router.put("/modifierProduit/:id_produit", produit.updateProduit);
router.get("/getproduit", produit.getProduit);
router.get("/getPageProduit/:limit/:offset", produit.getPageProduit);
router.get(
  "/getProduitByCategorie/:nom_categorie",
  produit.getProduitBy_Categorie
);
router.get("/getCategorie", produit.getCategorie);

module.exports = router;
