const {Router} = require("express")
const marinade = require ("../controller/controller.marinade")
const router = Router()


router.post ("/ajouterMarinade",marinade.ajouterProcessMarinade )
router.put ("/ajouterMarinadeEnStock/:id_marinade",marinade.modifierProcessMarinade )
router.get ("/getProcessByDateHeure", marinade.getProcessByDateHeure)
router.get( "/getProcessByEtapes_categorie/:categorie", marinade.getProcessByEtapes_categorie)
router.get( "/getProcessByEtapes_produit/:nom_produit", marinade.getProcessByEtapes_produit)
router.get( "/getProcessByEtapes_idGnerate/:id_gnerate", marinade.getProcessByEtapes_idGnerate)

module.exports = router