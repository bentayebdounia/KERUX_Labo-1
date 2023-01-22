const {Router} = require("express")
const alerte = require ("../controller/controlle.alert")
const router = Router()

router.post("/ajouterAlert", alerte.ajouterAlert)
router.put("/modifierAlert/:fk_processs", alerte.updateAlert)
router.get("/alertCount/:date_alert", alerte.countAlert)
router.get("/alertCountPrimary/:date_alert", alerte.countAlertPrimary)
router.get("/alertCountEtape/:date_alert/:etape", alerte.countAlertEtape)
router.get("/alertCountEtapePrimary/:date_alert/:etape", alerte.countAlertEtapePrimary)
router.get("/dataAlert/:date_alert/", alerte.DataAlert)
router.get("/dataAlertPrimary/:date_alert/", alerte.DataAlertPrimary)

module.exports = router
