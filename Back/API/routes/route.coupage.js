const {Router} = require("express")
const coupage = require ("../controller/controller.coupage")
const router = Router()


router.post ("/ajouterCoupage",coupage.ajouterProcessCoupage)
router.post ("/ajouterBoxCouper", coupage.ajouterBoxCoupage)
router.put ("/ajouterCoupageEnStock/:id_enregistrement",coupage.modifierProcessCoupage )
router.get ("/getIdCoupage/:id_gnerate", coupage.getProcessId)
router.get ("/getProcessByDateHeure",coupage.getProcessByDateHeure)
router.get( "/getProcessByEtapes_categorie/:categorie", coupage.getProcessByEtapes_categorie)
router.get( "/getProcessByEtapes_produit/:nom_produit", coupage.getProcessByEtapes_produit)
router.get( "/getProcessByEtapes_idGnerate/:id_gnerate", coupage.getProcessByEtapes_idGnerate)

router.get( "/getNettroyage", coupage.getProcessNettoyageTble)
router.get( "/getCoupageTble", coupage.getBox_coupageTble)

module.exports = router