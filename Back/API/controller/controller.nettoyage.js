const pool =require ("../db")
const queries= require("../queries/queries.nettoyage")
const q= require("../queries/queries")

const actual = require ( "../queries/queries.ActualiteProcess") 


const dateNow = () => {
    var today = new Date 
    datee = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + (today.getDate()+1)
    console.log("dateeee "+datee );
    return datee
}
const dateNow2 = () => {
    var today = new Date 
    datee = today.getFullYear()+''+(today.getMonth() + 1) + '' + (today.getDate())
    console.log("dateeee "+datee );
    return datee
}

const HeureNow = () => {
    var today = new Date 
    heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    console.log("heure "+heure );
    return heure
}
const TimeNow = () => {
    var today = new Date 
    heure = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()+ '' + today.getMilliseconds()
    console.log("heure "+heure );
    return heure
}

const generieIdNettoyage = (fk_proditFourni, etape ) => {
    
    
    const spl = etape.split('')
    console.log(spl[0]+spl[1])
    var id = (fk_proditFourni+""+spl[0]+spl[1]+""+dateNow2()+""+TimeNow())  
    return id
}

ajouterProcessNettoyage =(req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    console.log(datee)
    console.log(heure);
    const { categorie, nom_produit, etape, poids, nombre, id_enregistrement, fk_proditFourni } = req.body
    var id_gnerate = generieIdNettoyage(fk_proditFourni,etape)
    pool.query(queries.ajouterProcessNettoy, [categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, fk_proditFourni , id_gnerate ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows[0])
         })
    pool.query(queries.ajouterProcessNettoyHist, [categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, fk_proditFourni, id_gnerate ] ,
    (error, result) =>{
        if (error) throw error 
        res.status(200)
    })
}
modifierProcessNettoyage = (req, res) => {
    const id_nettoyage = parseInt(req.params.id_nettoyage)
    const {fk_stock} = req.body
    pool.query(queries.ModifyProcessNettoy,[fk_stock , id_nettoyage],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process nettoyage bien modifier ")
        })
    pool.query(queries.ModifyProcessNettoyHist,[fk_stock , id_nettoyage],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process nettoyage bien modifier ")
        })
}


getProcessId = (req, res) => {
    const id = req.params.id_gnerate
    pool.query(queries.getProcessByIdNettoyage, [id], 
        (error, result) => {
            const notExiste = result.rows.length
            if (!notExiste) {
                res.send("ID n'existe pas")
            }
            else{
                pool.query(queries.getProcessbyIdEnregistrement, [id], 
                    (error, resultat) => {
                        const notExiste = resultat.rows.length
                        if (!notExiste) {
                            res.status(200).json(result.rows[0])
                        }
                         else res.send("box deja nettoyer")   
                    })


            }
            
            
    })
    
}


getProcessByDateHeure = (req, res) => {
    pool.query(q.getProcessBydateHeure, ['nettoyage'],
    (error, result) => {
         res.status(200).json(result.rows)
    }
    )
}


getProcessByEtapes_categorie = (req, res) => {
    const categorie = req.params.categorie
    pool.query(q.getProcessByEtapes_categorie, ['nettoyage', categorie+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(q.getProcessByEtapes_produit, ['nettoyage', nom_produit+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_idGnerate = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    pool.query(q.getProcessByEtapes_idGnerate, ['nettoyage', id_gnerate], 
        (error, result) => {
            res.status(200).json(result.rows)  
    }
    )
}

getProduitEnAttente = (req, res) => {
    pool.query(actual.ActualProcess, ['enregistrement', 'nettoyage'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}
getProduitEnStock = (req, res) => {
    pool.query(actual.ActualProcessEnStock, ['enregistrement', 'nettoyage'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}

getProcessEnrgTble= (req,res) => {
    pool.query(actual.ProcessTble, ['enregistrement'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}

getProcessNetTble= (req,res) => {
    pool.query(actual.ProcessTble, ['nettoyage'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}
module.exports = {
    ajouterProcessNettoyage,
    modifierProcessNettoyage,
    getProcessId,
    getProcessByDateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate,
    getProduitEnAttente,
    getProduitEnStock,

    getProcessEnrgTble,
    getProcessNetTble

}