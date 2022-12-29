const {Router} = require("express")
const statistique = require ("../controller/controllerStatistique")

const router = Router()

router.get('/categorieProduitFourni/:categorie/:debut/:fin', statistique.getCategorieProduitFourni)
router.get('/typeProduitFourni/:nom_produit/:datee', statistique.getTypeProduitFourni)


module.exports = router
