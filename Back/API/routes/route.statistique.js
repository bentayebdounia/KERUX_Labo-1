const { Router } = require("express");
const statistique = require("../controller/controllerStatistique");

const router = Router();

router.get(
  "/categorieProduitFourni/:categorie/:debut/:fin",
  statistique.getCategorieProduitFourni
);
router.get(
  "/typeProduitFourni/:nom_produit/:debut/:fin",
  statistique.getTypeProduitFourni
);
router.get(
  "/typeProduitFourniProcess/:nom_produit/:etape/:debut/:fin",
  statistique.getstatProduitProcess
);

module.exports = router;
