// ajouter alert 

const ajouterAlert = "INSERT INTO alert (fk_processs, date_alert, existe )"
                                +" VALUES ($1, $2, $3) "

//modifier alert 

const updateAlert = "UPDATE alert SET existe=$1 WHERE fk_processs=$2 "

module.exports = {
    ajouterAlert,
    updateAlert
}

