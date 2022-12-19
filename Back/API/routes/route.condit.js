const {Router} = require("express")
const condit = require ("../controller/controller.condit")
const router = Router()


router.post ("/ajouterCondit",condit.ajouterProcessCondit )
router.put ("/ajouterConditEnStock/:id_conditionnement",condit.modifierProcessCondit )
router.get ("/getIdCoupage/:id_gnerate", condit.getProcessId)
router.get ("/getProcessByDateHeure", condit.getProcessByDateHeure)
router.get( "/getProcessByEtapes_categorie/:categorie", condit.getProcessByEtapes_categorie)
router.get( "/getProcessByEtapes_produit/:nom_produit", condit.getProcessByEtapes_produit)
router.get( "/getProcessByEtapes_idGnerate/:id_gnerate", condit.getProcessByEtapes_idGnerate)
router.get( "/getActuelle", condit.getProduitEnAttente)
router.get( "/actualStock", condit.getProduitEnStock)

router.get( "/getCoupageTble", condit.getProcessCoupTble)
router.get( "/getConditionnementTble", condit.getProcessCondiTble)


module.exports = router