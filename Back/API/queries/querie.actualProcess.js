const ActualProcess = "SELECT * FROM process WHERE etape=$1 OR etape=$2 ORDER BY datee  ASC, heure ASC" 
 
module.exports ={ 
    ActualProcess 
}
