const pool =require ("../db")
const queries= require("../queries/quierie.fornisseur")


ajouterFournisseur = (req, res) => {
    date_enregistement = new Date 
    const { nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie  } = req.body
    pool.query(queries.ajouterFourniseur, [nom_fournisseur, forme_juridique, adresse_fournisseur, email,  activite, modalite_paiement, type_paiement, nature_livraison, categorie, date_enregistement ] ,
             (error, result) =>{
                if (error) throw error
                res.status(200).json(result.rows[0])
             }) 
}

ajouterContact = (req, res) => {
    const  {fk_fournisseur, nom_contact, numero_telephone}= req.body
    pool.query(queries.ajouterContact , [fk_fournisseur, nom_contact, numero_telephone],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("contact bien ajouter")
         })
}

getFournisseurByNom = (req, res) => {
    const categorie = req.params.categorie
    pool.query(queries.getFournisseurByCategorie, [categorie+'%'],
        (error, result) =>{
            if (error) throw error
            const notExiste = result.rows.length
            if (!notExiste) {
                res.send("ID n'existe pas")
            }
            else 
                res.status(200).json(result.rows)

        })
}
getAllFournisseur = (req, res) => {
    pool.query(queries.getAllFournisseur, 
                (error, result) => {
                    if (error) throw error
                    res.status(200).json(result.rows)
                })
}

getFournisseurByNomCategorie = (req, res) => {
    const nom_fournisseur = req.params.nom_fournisseur
    const categorie = req.params.categorie
    pool.query(queries.getFournisseurByNomOrCategorie, [nom_fournisseur+'%',categorie+'%'] ,
        (error, result) => {
            if (error) throw error
                res.status(200).json(result.rows)
        }  
        )
}

module.exports ={
    ajouterFournisseur,
    ajouterContact,
    getFournisseurByNom,
    getAllFournisseur, 
    getFournisseurByNomCategorie
}


