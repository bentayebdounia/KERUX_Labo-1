const express = require ("express")
const app = express()
const cors= require("cors")
//const pool = require ("./db")
const roleRoute = require ("./routes/route_role")

const personneRoute = require ("./routes/route.personne")

const entrepotRoute = require("./routes/route.entrepot")
const stockRoute = require("./routes/route.stock")

const processRoute = require ("./routes/route.process")
const enregistrementRoute = require("./routes/route.enregitrement")
const nettoyageRoute = require("./routes/route.nettoyage")
const coupageRoute = require("./routes/route.coupage")
const conditRoute = require("./routes/route.condit")
const marinadeRoute = require("./routes/route.marinade")
const sortietRoute = require("./routes/route.sortie")
const agentProcess = require("./routes/route.agentProcess")

const fournisseur = require("./routes/route_fournisseur")
const produit = require("./routes/route.produit")
const statistique = require("./routes/route.statistique")

const pagination = require("./routes/route.pagination")

const alerte = require("./routes/route.alert")

const processactuel = require("./routes/route.actuelProcess")


//----------------middleware ---------------------------------------------------//
app.use(cors())
app.use(express.json()) //req.body


//-----------------------ROUTES---------------------------------------------//
app.use("/api/", roleRoute)
app.use("/agent/", personneRoute)
app.use("/process", processRoute)
app.use("/process/enregistrement", enregistrementRoute)
app.use("/process/nettoyage", nettoyageRoute)
app.use("/process/coupage", coupageRoute)
app.use("/process/conditionnement", conditRoute)
app.use("/process/marinade", marinadeRoute)
app.use("/process/sortie", sortietRoute)

app.use("/entrepot",entrepotRoute)
app.use("/stock", stockRoute)

app.use("/agentProcess", agentProcess)

app.use("/fournisseur", fournisseur)
app.use("/produit", produit)

app.use("/statistique", statistique )

app.use("/pagination", pagination)

app.use("/alert", alerte )
app.use("/actuelprocess", processactuel)


//--ajouter
//require("./routes/route_role.js")
/*

//--afficher

app.get("/role", async(req, res ) => {
    try {
        const allRoles = await pool.query("SELECT * FROM role")
        res.json(allRoles.rows)
    } catch (err) {
        console.log(err.message);
    }
})


*/


app.listen(8080, () => {
    console.log("server has started on port 8080");
})