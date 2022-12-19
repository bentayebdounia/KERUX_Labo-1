const {Router} = require("express")
const stock = require ("../controller/controller.stock")
const router = Router()

router.post("/ajouterStock", stock.ajouterStock)
router.put("/modifierStock/:id_stock", stock.modifierStock)
router.get("/getStock", stock.getStock)
router.get("/getStockByDate/:datee", stock.getStockByDate)
router.get("/getStockByEtape/:etape", stock.getStockByEtape)


module.exports = router