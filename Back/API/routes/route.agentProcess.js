const { Router } = require("express");
const agentprocess = require("../controller/controller.agenProcess");
const router = Router();

router.post("/ajouter", agentprocess.ajouterProcess);

module.exports = router;
