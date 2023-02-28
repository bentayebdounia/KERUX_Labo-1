//get stock order by date et heure 
getStock =
  "SELECT * FROM process, stock, entrepot WHERE fk_stock=id_stock AND fk_stock=id_stock  ORDER BY datee DESC , heure DESC;";

//get stock by etape
getStockByEtape =
  "SELECT * FROM process, stock, entrepot WHERE fk_stock=id_stock AND fk_stock=id_stock AND etape=$1 ORDER BY datee DESC , heure DESC";

//get stock by date 
getStockByDate =
  "SELECT * FROM process, stock, entrepot WHERE fk_stock=id_stock AND fk_stock=id_stock AND datee=$1 ORDER BY datee DESC , heure DESC";


module.exports={
    getStock,
    getStockByEtape,
    getStockByDate

}
