import axios from 'axios'

const POST_ALERT = "http://localhost:8080/alert//ajouterAlert"
const UPDATE_ALERT = "http://localhost:8080/alert//modifierAlert/"
const COUNT_ALERT = "http://localhost:8080/alert/alertCount/"
const COUNT_ALERT_PRIMARY = "http://localhost:8080/alert/alertCountPrimary/"
const COUNT_ALERT_ETAPE = "http://localhost:8080/alert/alertCountEtape/"
const COUNT_ALERT_ETAPE_PRIMARY = "http://localhost:8080/alert/alertCountEtapePrimary/"

class AlertService {
   
    ajouterAlert(fk_processs, date_alert, etape) {
        
        const alertData = {fk_processs, date_alert, etape}
        
        return axios.post(POST_ALERT, alertData)
    }

    updateAlert (fk_process) {
        const existe = false
        return axios.put(UPDATE_ALERT+fk_process, existe )
    }

    countAlert (date_alert) {
        return axios.get(COUNT_ALERT+date_alert )
    }

    countAlertPrimary (date_alert) {
        return axios.get(COUNT_ALERT_PRIMARY+date_alert )
    }

    countAlertEtape (date_alert,etape) {
        return axios.get(COUNT_ALERT+date_alert +"/" +etape)
    }

    countAlertEtapePrimary (date_alert,etape) {
        return axios.get(COUNT_ALERT_ETAPE_PRIMARY+date_alert +"/" +etape)
    }


}

export default new AlertService()
