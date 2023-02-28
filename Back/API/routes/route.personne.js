const { Router } = require("express");
const personne = require("../controller/controller.personne");
const router = Router();

router.post("/ajouterPersonne", personne.AjouterPersonne);
router.put("/modifierPersonne/:id_personne", personne.updatePersonne);
router.get("/getPersonne/:id_personne", personne.getId);
router.get("/getPersonne/nom/:nom", personne.getNom);
router.get("/getPersonne/prenom/:prenom", personne.getPrenom);
router.get("/login/:id_personne/:mot_passe", personne.Login);
router.get("/getPersonne/", personne.getAllPersonne);
router.get("/getPagePersonne/:limit/:offset", personne.getPagePersonne);
router.get("/getByNomOrPrenom/:nom/:prenom", personne.getPersonneByNomOrPnom);

module.exports = router;
