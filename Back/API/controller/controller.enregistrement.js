const pool =require ("../db")
const queries= require("../queries/queries")


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


const generieIdEnreg = (fk_proditFourni, etape ) => {
    var today = new Date()
    const datt = 0 
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
    
    const spl = etape.split('')
    console.log(spl[0]+spl[1])
    var id = (frk_fournisseur +""+ fk_bon+""+datt+""+ +""+TimeNow())  
    return id
}



ajouterProcessEnregistrement =(req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    const { categorie, nom_produit, etape, poids, nombre, fk_proditFourni } = req.body
    var id_gnerate = generieIdEnreg(fk_proditFourni,etape)
    pool.query(queries.ajouterProcessEnreg, [categorie, nom_produit, etape, poids, nombre, datee, heure,  fk_proditFourni , id_gnerate ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows[0])
         })
    pool.query(queries.ajouterProcessEnregHist, [categorie, nom_produit, etape, poids, nombre, datee, heure, fk_proditFourni, id_gnerate ] ,
    (error, result) =>{
        if (error) throw error
        res.status(200)
    })
} 
modifierProcessEnregistrement = (req, res) => {
    const id_enregistrement = parseInt(req.params.id_enregistrement)
    const {fk_stock} = req.body
    pool.query(queries.ModifyProcessEnreg,[fk_stock , id_enregistrement],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process enregistrement bien modifier ")
        })
    pool.query(queries.ModifyProcessEnregHist,[fk_stock , id_enregistrement],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process enregistrement bien modifier ")
        })
}

getProcessByDateHeure = (req, res) => {
    pool.query(queries.getProcessBydateHeure , ['enregistrement'],
    (error, result) => {
         res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_categorie = (req, res) => {
    const categorie = req.params.categorie
    pool.query(queries.getProcessByEtapes_categorie, ['enregistrement', categorie+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(queries.getProcessByEtapes_produit, ['enregistrement', nom_produit+'%'], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_idGnerate = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    pool.query(queries.getProcessByEtapes_idGnerate, ['enregistrement', id_gnerate], 
        (error, result) => {
            res.status(200).json(result.rows)  
    }
    )
}

module.exports = {
    
    ajouterProcessEnregistrement,
    modifierProcessEnregistrement,
    getProcessByDateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate
 
}