
/*
const ActualProcess = "SELECT * FROM process WHERE etape=$1 OR etape=$2 ORDER BY datee  ASC, heure ASC"

const ActualProcessEnStock = "SELECT * FROM process, stock, entrepot WHERE fk_stock=id_stock AND fk_entrepot=id_entrepot AND (etape=$1 OR etape=$2) ORDER BY process.datee"
*/
const ProcessTble= "SELECT * FROM process WHERE etape=$1 ORDER BY datee  ASC, heure ASC"

const box_coupage_Tble= "SELECT * FROM box_couper ORDER BY datee , heure ASC"

const ActualProcess = "SELECT * FROM process, alert WHERE etape=$1 AND id_process=fk_processs AND existe='true' AND  fk_stock IS NULL  ORDER BY date_alert  ASC" 
const ActualProcessEnStock = "SELECT * FROM process, alert,stock, entrepot WHERE etape=$1 AND id_process=fk_processs AND fk_stock=id_stock AND fk_entrepot=id_entrepot AND existe='true' ORDER BY date_alert  ASC"


module.exports ={
    ActualProcess,
    ActualProcessEnStock,
    ProcessTble,
    box_coupage_Tble
}