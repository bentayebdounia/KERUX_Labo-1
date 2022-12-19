const pool =require ("../db")
const queries= require("../queries/queries")

AjouterPersonne = (req , res) => {
    const {nom, prenom, date_naissance, num_tel, adresse, fk_role } = req.body
    pool.query(queries.postPersonne, [nom, prenom, date_naissance, num_tel, adresse, fk_role ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).send("Agent bien ajouter")
         })
    
}

getId = (req, res) => {
    const id = parseInt(req.params.id_personne)
    pool.query(queries.getPersonneById, [id], (error, result) => {
        const notExiste = result.rows.length
        if (!notExiste) {
            res.send("ID n'existe pas")
        }
        else //res.send("ID existe")
         res.status(200).json(result.rows)
        //console.log(result.rows[1]);
    })
    
}

getNom = (req, res) => {
    const nom_personne = req.params.nom
    pool.query(queries.getPersonneByNom, [nom_personne+'%'], (error, result) => {
        const notExist = result.rows.length
        
         res.status(200).json(result.rows)
        //console.log(result.rows[1]);
    })
    
}

getPrenom = (req, res) => {
    const prenom_personne = req.params.prenom
    pool.query(queries.getPersonneByPrenom, [prenom_personne+'%'], (error, result) => {
        
         res.status(200).json(result.rows)
        //console.log(result.rows[1]);
    })
    
}

getAllPersonne = (req, res) => {
    pool.query("SELECT * FROM personne", (error, result) => {
        if (error) throw error 
        res.status(200).json(result.rows)
    })
}

Login = (req, res) => {
    const id = parseInt(req.params.id_personne)
    const password = req.params.mot_passe
    pool.query(queries.Login, [id, password], (error, result) => {
        const notExist = !result.rows.length
        if (notExist) {
            res.send("Mot de passe incorrect")
        }
        else {
            //res.send("Mot de passe correct")
            console.log(res.json(result.rows)); 
        }
    })
    
}


module.exports = {
    AjouterPersonne,
     getId,
    Login,
    getAllPersonne,
    getNom,
    getPrenom
}