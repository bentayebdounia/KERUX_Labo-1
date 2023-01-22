// ajouter alert 

const ajouterAlert = "INSERT INTO alert (fk_processs, date_alert, existe )"
                                +" VALUES ($1, $2, $3) "

//modifier alert 

const updateAlert = "UPDATE alert SET existe=$1 WHERE fk_processs=$2 "

const countAlert = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert = $1"

const countAlertPrimary = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert > $1"

const countAlertEtape = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert = $1 AND etape = $2"

const countAlertEtapePrimary = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert = $1 AND etape > $2"

module.exports = {
    ajouterAlert,
    updateAlert,
    countAlert,
    countAlertPrimary,
    countAlertEtape,
    countAlertEtapePrimary
}

