const pool =require ("../db")
const queries= require("../queries/queries.conditionnement")
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

// const generieIdConditionnement = (fk_proditFourni, etape ) => {
    
    
//     const spl = etape.split('')
//     console.log(spl[0]+spl[1]+spl[2])
//     var id = (fk_proditFourni+""+spl[0]+spl[1]+spl[2]+""+dateNow2()+""+TimeNow())  
//     return id
// }


const generieIdConditionnement = (id,cle) => {
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
    
    var n = (id.substring(0,id.length-7)+""+datt+""+ year[3]+""+cle)  
    return n
}

ajouterProcessCondit =(req, res) => {
    var datee =new Date
    var heure = HeureNow()
    const { categorie, nom_produit, etape, poids, nombre,  id_nettoyage, id_coupage,  fk_proditFourni, cle } = req.body
    var id_gnerate = generieIdConditionnement(id_coupage,cle)
    pool.query(queries.ajouterProcessCond, [ categorie, nom_produit, etape, poids, nombre, datee, heure,  id_nettoyage, id_coupage, fk_proditFourni, id_gnerate ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows[0])
         })
    pool.query(queries.ajouterProcessCondHist, [ categorie, nom_produit, etape, poids, nombre, datee, heure,  id_nettoyage, id_coupage, fk_proditFourni, id_gnerate ] ,
    (error, result) =>{
        if (error) throw error
        res.status(200)
    })
}
modifierProcessCondit = (req, res) => {
    const id_conditionnement = parseInt(req.params.id_conditionnement)
    const {fk_stock} = req.body
    pool.query(queries.ModifyProcessCond,[fk_stock , id_conditionnement],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process conditionnement bien modifier ")
        })
    pool.query(queries.ModifyProcessCondHist,[fk_stock , id_conditionnement],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process conditionnement bien modifier ")
        })
}

getProcessId = (req, res) => {
    const id = req.params.id_gnerate
    pool.query(queries.getProcessByIdCondit, [id], 
        (error, result) => {
            const notExiste = result.rows.length
            if (!notExiste) {
                res.send("ID n'existe pas")
            }
            else{
                pool.query(queries.getProcessbyIdCoupage, [id], 
                    (error, resultat) => {
                        const notExiste = resultat.rows.length
                        if (!notExiste) {
                            res.status(200).json(result.rows[0])
                        }
                         else res.send("box deja conditionner")   
                    })


            }
            
            
    })
    
}

getProcessByDateHeure = (req, res) => {
    pool.query(q.getProcessBydateHeure, ['conditionnement'],
    (error, result) => {
         res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_categorie = (req, res) => {
    const categorie = req.params.categorie
    pool.query(q.getProcessByEtapes_categorie, ['conditionnement', categorie+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(q.getProcessByEtapes_produit, ['conditionnement', nom_produit+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_idGnerate = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    pool.query(q.getProcessByEtapes_idGnerate, ['conditionnement', id_gnerate], 
        (error, result) => {
            res.status(200).json(result.rows)  
    }
    )
}
getProduitEnAttente = (req, res) => {
    pool.query (actual.ActualProcess, ['coupage' ],
            (error, result) => {
                res.status(200).json(result.rows)  
        }
    )
}
getProduitEnStock = (req, res) => {
    pool.query(actual.ActualProcessEnStock, ['coupage'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}

getProcessCoupTble= (req,res) => {
    pool.query(actual.ProcessTble, ['coupage'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}

getProcessCondiTble= (req,res) => {
    pool.query(actual.ProcessTble, ['conditionnement'] ,
    (error, result) => {
        res.status(200).json(result.rows)  
    }
    )
}



module.exports = {
    ajouterProcessCondit,
    modifierProcessCondit,
    getProcessId, 
    getProcessByDateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate,
    getProduitEnAttente,
    getProduitEnStock,

    getProcessCoupTble,
    getProcessCondiTble

}