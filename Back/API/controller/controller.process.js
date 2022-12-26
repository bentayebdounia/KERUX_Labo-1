const pool =require ("../db")
const queries= require("../queries/queries")
const GetDat = require ("./GetDate")

const dateNow = () => {
    var today = new Date 
    //on doit regler la date pcq les donnee dans la bdd ajoute un jour mais on affichage n'ajoute rien
    datee = today.getFullYear()+'-'+(today.getMonth()+1) + '-' + (today.getDate()+1)
    console.log("dateeee "+datee );
    return datee
}

const HeureNow = () => {
    var today = new Date 
    heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    console.log("heure "+heure );
    return heure
}

//////***************** Ajouter un BON  -----------------------------------------------------*/
ajouterBon = (req, res) => { 
    var datee = dateNow()
    var heure = HeureNow()
    
    const { fk_fournisseur, acheteur, type_bon, recepteur, livreur } = req.body
    pool.query(queries.ajouterReception, [fk_fournisseur ,acheteur ,type_bon  ,datee , heure, recepteur, livreur] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows)
         })

}

//////***************** Ajouter un PRODUIT FOURNI  -----------------------------------------------------*/
ajouterProduitFourni =(req, res) =>{
    var datee = dateNow()
    var heure = HeureNow()
    const { categorie, nom_produit, poids_fourni, nombre_fourni,  fk_bon} = req.body
    pool.query(queries.ajouterProduitFourni, [ categorie, nom_produit, poids_fourni, nombre_fourni, datee, heure , fk_bon ] ,
         (error, result) =>{
            console.log(result)
            if (error) throw error
            res.status(200).json(result.rows)
         })
}

ajouterProcess =(req, res) =>{
    const { categorie, nom_produit, poids_fourni, nombre_fourni, datee, heure , fk_bon} = req.body
    pool.query(queries.ajouterProduitFourni, [ categorie, nom_produit, poids_fourni, nombre_fourni, datee, heure , fk_bon ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).send("produit bien ajouter")
         })
}

modifierProcess = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    const {fk_stock} = req.body
    
    console.log(id_gnerate);
    console.log(fk_stock)
    pool.query(queries.ModifyProcess,[fk_stock , id_gnerate],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process bien modifier ")
        })
    pool.query(queries.ModifyProcessHist,[fk_stock , id_gnerate],
        (error, result) =>{
            if (error) throw error
            res.status(200)
        })
}




//////***************** Get process par ID  -----------------------------------------------------*/
getProcessId = (req, res) => {
    const id = req.params.id_gnerate
    pool.query(queries.getProcessById, [id], 
        (error, result) => {
            if (error) throw error
            const notExiste = result.rows.length
            if (!notExiste) {
                res.send("ID n'existe pas")
            }
            else res.status(200).json(result.rows[0])
            
    })
    
}


getBonBydateHeur= (req, res) => {
    pool.query(queries.getBonBydateHeure ,(error, result) => {
        if (error) throw error
        res.status(200).json(result.rows)
    }
    )
}

getbonByFournisseur = (req, res) => {
    pool.query(queries.getbonByFournisseur,
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
       }
        )
}

getBon_NomFournisseur = (req, res) => {
    const nom_fournisseur = req.params.nom_fournisseur
     pool.query (queries.getBonByNomFournisseur, [nom_fournisseur+'%'],
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
        }
        )
}

getProdFourni = (req, res) => {
    pool.query(queries.getProdFourni,
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
       }
        )
}

getProdByNomFourniseur = (req, res) => {
    const nom_fournisseur = req.params.nom_fournisseur
    pool.query (queries.getProdByNomFourniseur, [nom_fournisseur+'%'] , 
        (error, result) => {
            if (error) throw error
            res.status(200).json(result.rows)
       }
        )
}


module.exports = {
    ajouterBon,
    ajouterProcess,
    ajouterProduitFourni,
    modifierProcess,
    getProcessId,
    getbonByFournisseur,
    getProdFourni,
    getProdByNomFourniseur,
    getBonBydateHeur,
    getBon_NomFournisseur,

}