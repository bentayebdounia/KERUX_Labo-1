// ajouter alert 

const ajouterAlert = "INSERT INTO alert (fk_processs, date_alert, existe )"
                                +" VALUES ($1, $2, $3)  RETURNING id_alert"

//modifier alert 

const updateAlert = "UPDATE alert SET existe=$1 WHERE fk_processs=$2 "

const updateDateAlert = "UPDATE alert SET  date_alert=$1 WHERE fk_processs=$2 "

const countAlert = " SELECT COUNT(*) FROM alert WHERE  existe=true AND date_alert >= $1"

const countAlertPrimary = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert > $1"

const countAlertEtape = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert = $1 AND etape = $2"

const countAlertEtapePrimary = " SELECT COUNT(*) FROM alert WHERE existe=true AND date_alert >= $1 AND etape = $2 ORDER BY date_alert "

const DataAlert = "SELECT * FROM process, alert WHERE id_process=fk_processs AND date_alert = $1 AND existe= true ORDER BY etape"
const DataAlertPrimary = "SELECT * FROM process, alert WHERE id_process=fk_processs AND date_alert >= $1 AND existe= true ORDER BY date_alert"

module.exports = {
    ajouterAlert,
    updateAlert,
    updateDateAlert,
    countAlert,
    countAlertPrimary,
    countAlertEtape,
    countAlertEtapePrimary,
    DataAlert,
    DataAlertPrimary
}

