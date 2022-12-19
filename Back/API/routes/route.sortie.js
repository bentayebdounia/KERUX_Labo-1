const {Router} = require("express")
const sortie = require ("../controller/controller.sortie")
const router = Router()


router.post ("/ajouterSortie",sortie.ajouterProcessSortie )
router.put ("/ajouterSortieEnStock/:id_sortie",sortie.modifierProcessSortie )
router.get ("/getConditionnemet/:id_gnerate", sortie.getProcessId)
router.get ("/getProcessByDateHeure", sortie.getProcessByDateHeure)
router.get( "/getProcessByEtapes_categorie/:categorie", sortie.getProcessByEtapes_categorie)
router.get( "/getProcessByEtapes_produit/:nom_produit", sortie.getProcessByEtapes_produit)
router.get( "/getProcessByEtapes_idGnerate/:id_gnerate", sortie.getProcessByEtapes_idGnerate)
router.get( "/getActuelle" , sortie.getProduitEnAttente)

router.get( "/actualStock", sortie.getProduitEnStock)

router.get( "/getConditionnementTble", sortie.getProcessConditpTble)
router.get( "/getSortieTble", sortie.getProcessSortieTble)


module.exports = router