const {Router} = require("express")
const alerte = require ("../controller/controlle.alert")
const router = Router()

router.post("/ajouterAlert", alerte.ajouterAlert)
router.put("/modifierAlert/:fk_processs", alerte.updateAlert)

module.exports = router
