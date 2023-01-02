const {Router} = require("express")
const paginate = require ("../controller/controllerPagination")
const router = Router()

router.get( "/getLengthBon", paginate.countPageBon)
router.get( "/getLengthBonFournisseur/:fournisseur",  paginate.countPageBonFournisseur)
router.get("/getLimitBon/:limit/:offset", paginate.paginationageBon)


module.exports = router


