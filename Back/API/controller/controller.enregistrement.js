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
    
    
    const spl = etape.split('')
    console.log(spl[0]+spl[1])
    var id = (fk_proditFourni+""+spl[0]+spl[1]+""+dateNow2()+""+TimeNow())  
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
    pool.query(queries.getProcessByEtapes_categorie, ['enregistrement', categorie], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(queries.getProcessByEtapes_produit, ['enregistrement', nom_produit], 
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