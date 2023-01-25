//const ActualProcess = "SELECT * FROM process WHERE etape=$1 OR etape=$2 ORDER BY datee  ASC, heure ASC" 
const ActualProcess = "SELECT * FROM process, alert WHERE etape=$1 AND id_process=fk_processs AND existe='true' ORDER BY date_alert  ASC " 
 
module.exports ={ 
    ActualProcess 
}
