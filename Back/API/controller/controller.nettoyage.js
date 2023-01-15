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


const generieIdNettoyage = (id) => {
    var today = new Date()
    var datt = 0 
    switch (today.getMonth()) {
        case 0: datt= today.getDate()
            break;

        case 1: datt=31+ today.getDate()
            break;
        
        case 2: datt=60+ today.getDate()
            break;
        
        case 3: datt=91+ today.getDate()
            break;

        case 4: datt=121+ today.getDate()
            break;
        
        case 5: datt=152+ today.getDate()
            break;
        case 6: datt=182+ today.getDate()
            break;

        case 7: datt=213+ today.getDate()
            break; 

        case 8: datt=244+ today.getDate()
            break;

        case 9:datt=274+ today.getDate()
            break;

        case 10: datt=305+ today.getDate()
            break;

        case 11: datt=335+ today.getDate()
            break;

        default:
           break;
      }
    
      const year = today.getFullYear().toString().split('');
    
    var n = (id.substring(0,id.length-7)+""+datt+""+ year[3]+""+id.substring(id.length-4))  
    return n
}

ajouterProcessNettoyage =(req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    console.log(datee)
    console.log(heure);
    const { categorie, nom_produit, etape, poids, nombre, id_enregistrement, fk_proditFourni } = req.body
    var id_gnerate = generieIdNettoyage(id_enregistrement)
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