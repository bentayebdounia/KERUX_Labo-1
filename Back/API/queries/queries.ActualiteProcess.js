
/*
const ActualProcess = "SELECT * FROM process WHERE etape=$1 OR etape=$2 ORDER BY datee  ASC, heure ASC"

const ActualProcessEnStock = "SELECT * FROM process, stock, entrepot WHERE fk_stock=id_stock AND fk_entrepot=id_entrepot AND (etape=$1 OR etape=$2) ORDER BY process.datee"
*/
const ProcessTble= "SELECT * FROM process WHERE etape=$1 ORDER BY datee  ASC, heure ASC"

const box_coupage_Tble= "SELECT * FROM box_couper ORDER BY datee , heure ASC"

const ActualProcess = "SELECT * FROM process, alert WHERE etape=$1 AND id_process=fk_processs AND existe='true' AND  fk_stock IS NULL AND date_alert > $2  ORDER BY date_alert  ASC" 
const ActualProcessEnStock = "SELECT * FROM process, alert,stock, entrepot WHERE etape=$1 AND id_process=fk_processs AND fk_stock=id_stock AND fk_entrepot=id_entrepot AND existe='true' AND date_alert>$2 ORDER BY date_alert  ASC"

const ActualProcessBlock = "SELECT * FROM process, alert WHERE etape=$1 AND id_process=fk_processs AND existe='true' AND  fk_stock IS NULL AND date_alert=$2 ORDER BY date_alert  ASC" 
const ActualProcessEnStockBlock = "SELECT * FROM process, alert,stock, entrepot WHERE etape=$1 AND id_process=fk_processs AND fk_stock=id_stock AND fk_entrepot=id_entrepot AND existe='true' AND date_alert=$2 ORDER BY date_alert  ASC"
const getIdBloquant = "SELECT * FROM process, alert WHERE etape=$1 AND id_process=fk_processs AND existe='true' AND date_alert=$2  AND id_gnerate=$3"
const getIdProcess = "SELECT * FROM process, alert WHERE etape=$1 AND id_process=fk_processs AND existe='true' AND date_alert>$2  AND id_gnerate=$3"

module.exports ={
    ActualProcess,
    ActualProcessEnStock,
    ActualProcessBlock,
    ActualProcessEnStockBlock,
    ProcessTble,
    box_coupage_Tble,
    getIdBloquant,
    getIdProcess
}