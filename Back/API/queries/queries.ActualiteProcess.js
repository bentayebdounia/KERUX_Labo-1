

const ActualProcess = "SELECT * FROM process WHERE etape=$1 OR etape=$2 ORDER BY datee  ASC, heure ASC"

const ActualProcessEnStock = "SELECT * FROM process, stock, entrepot WHERE fk_stock=id_stock AND fk_entrepot=id_entrepot AND (etape=$1 OR etape=$2) ORDER BY process.datee"

const ProcessTble= "SELECT * FROM process WHERE etape=$1 ORDER BY datee  ASC, heure ASC"

const box_coupage_Tble= "SELECT * FROM box_couper ORDER BY datee , heure ASC"


module.exports ={
    ActualProcess,
    ActualProcessEnStock,
    ProcessTble,
    box_coupage_Tble
}