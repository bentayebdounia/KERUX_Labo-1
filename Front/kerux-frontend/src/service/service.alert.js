import axios from 'axios'

const POST_ALERT = "http://localhost:8080/alert/ajouterAlert"
const UPDATE_ALERT = "http://localhost:8080/alert/modifierAlert/"
const UPDATE_DATE_ALERT = "http://localhost:8080/alert/modifierDateAlert/"
const COUNT_ALERT = "http://localhost:8080/alert/alertCount"
const COUNT_ALERT_PRIMARY = "http://localhost:8080/alert/alertCountPrimary/"
const COUNT_ALERT_ETAPE = "http://localhost:8080/alert/alertCountEtape/"
const COUNT_ALERT_ETAPE_PRIMARY = "http://localhost:8080/alert/alertCountEtapePrimary/"
const ALERT_DATA = "http://localhost:8080/alert/dataAlert/"
const ALERT_DATA_PRIMARY= "http://localhost:8080/alert/dataAlertPrimary/"

class AlertService {
   
    ajouterAlert(fk_processs, date_alert) {
        
        const alertData = {fk_processs, date_alert}
        
        return axios.post(POST_ALERT, alertData)
    }

    updateAlert (fk_process) {
        const existe = false
        return axios.put(UPDATE_ALERT+fk_process, existe )
    }

    updateDateAlert ( fk_process , date_alert ) {
        
        const date_alerte = {date_alert} 
        console.log(date_alerte);
        return axios.put(UPDATE_DATE_ALERT+fk_process, date_alerte )
    }

    countAlert () {
        return axios.get(COUNT_ALERT )
    }

    countAlertPrimary (date_alert) {
        return axios.get(COUNT_ALERT_PRIMARY+date_alert )
    }

    countAlertEtape (date_alert,etape) {
        return axios.get(COUNT_ALERT_ETAPE+date_alert +"/" +etape)
    }

    countAlertEtapePrimary (date_alert,etape) {
        return axios.get(COUNT_ALERT_ETAPE_PRIMARY+date_alert +"/" +etape)
    }

    alertData (date_alert) {
        return axios.get(ALERT_DATA+date_alert )
    }

    alertDataPrimary (date_alert) {
        return axios.get(ALERT_DATA_PRIMARY+date_alert )
    }


}

export default new AlertService()
