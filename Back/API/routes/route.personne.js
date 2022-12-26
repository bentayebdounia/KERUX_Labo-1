const {Router} = require("express")
const personne = require ("../controller/controller.personne")
const router = Router()

router.post("/ajouterPersonne" , personne.AjouterPersonne)
router.get("/getPersonne/id/:id_personne", personne.getId)
router.get("/getPersonne/nom/:nom", personne.getNom)
router.get("/getPersonne/prenom/:prenom", personne.getPrenom)
router.get("/login/:id_personne/:mot_passe", personne.Login)
router.get("/getPersonne/", personne.getAllPersonne)
router.get("/getByNomOrPrenom/:nom/:prenom", personne.getPersonneByNomOrPnom)

module.exports = router