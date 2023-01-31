const {Router} = require("express")
const process = require ("../controller/controller.actuelProcess")
const router = Router()

router.get( "/getActuelle/:etape", process.getProduitEnAttente)
router.get( "/actualStock/:etape", process.getProduitEnStock)
router.get( "/getActuelleBlock/:etape", process.getProduitEnAttenteBlock)
router.get( "/actualStockBlock/:etape", process.getProduitEnStockBlock)
router.get( "/getIdProcess/:etape/:id_gnerate", process.getIdProcess)
router.get( "/getIdBloquant/:etape/:id_gnerate", process.getIdBloquant)

module.exports = router
