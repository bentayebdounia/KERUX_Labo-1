import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import serviceStock from '../../service/service.stock'
import moment from 'moment';
const MouvementStock = (props) => {
    
    const [stock, setStock] = useState([])
    const [stockRecherche, setStockRecheche ] =useState([])
    const [comboBox, setComboBox] = useState('')
    const [serchValue, setSerchValue] = useState('')
    const [enStock, setenStock] = useState([])
    const [sortieStock, setSortiestock] = useState([])
    let tableGeneral, tableCondition , barRechereche , dateRecherech
    
    useEffect(() => {
        serviceStock.getStock()
        .then ((res) => {
            setStock(res.data)
        })
              
    })
     
    const StockFunction = () => {
        enStock.splice  ("")
        sortieStock.splice("")
        for (var i=0; i< stock.length; i++) {
            if (stock[i].date_sortie === null){
                enStock.push(stock[i])

            }
            else sortieStock.push(stock[i])
        }


    } 

    const recherche = (e) => {
        e.preventDefault();
        stockRecherche.splice("")
        if (comboBox === 'etape' ) {
            serviceStock.getStockByEtape(serchValue)
            .then((res) => {
                setStockRecheche(res.data)
                console.log(res.data);
            })
        } 
        else if (comboBox === 'date' ) {
            
            serviceStock.getStockByDate(JSON.stringify(serchValue))
            .then((res) => {
                setStockRecheche(res.data)
                console.log(res.data);
            })
        } 
        else if (comboBox === 'en stock' ) {
            StockFunction()
        } 
        else if (comboBox === 'sortie de stock' ) {
            StockFunction()
        } 
        
    }
   
    if (comboBox===''){
            tableGeneral = (
                stock.map(
                    (p, key) =>
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.etape}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                            <td>{p.fk_entrepot}</td>
                            <td>{moment.utc(p.date_entree).format('DD/MM/YY')}</td>
                            <td>{moment.utc(p.date_sortie).format('DD/MM/YY')}</td>
                            <td>{p.poids_sortie}</td>
                        </tr>
                )
            )
        }

        else if(comboBox==='etape'){
            barRechereche = (
                <>
                    <select className="form-select" aria-label="Default select example" id="roleAgent"  value={serchValue} onChange={(e)=> setSerchValue(e.target.value)}>
                        <option  selected></option>
                        <option value="enregistrement">enregistrement</option>
                        <option value="nettoyage">nettoyage</option>
                        <option value="coupage">coupage</option>
                        <option value="conditionnement">conditionnement</option>
                        <option value="sortie">sortie</option>
                        
                    </select>
                        

                </>
            )
            tableCondition = (
                stockRecherche.map(
                    (p, key) =>
                    <tr key={key}>
                            <td>{key+1}</td>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.etape}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                            <td>{p.fk_entrepot}</td>
                            <td>{moment.utc(p.date_entree).format('DD/MM/YY')}</td>
                            <td>{moment.utc(p.date_sortie).format('DD/MM/YY')}</td>
                            <td>{p.poids_sortie}</td>
                    
                    </tr>
                )
            )
            
        }

        else if(comboBox==='date'){
            barRechereche = (
                <>
                    <input type="date" className="form-control"   value={serchValue} onChange={(e)=> setSerchValue(e.target.value)} />
                        

                </>
            )
            tableCondition = (
                stockRecherche.map(
                    (p, key) =>
                    <tr key={key}>
                             <td>{key+1}</td>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.etape}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                            <td>{p.fk_entrepot}</td>
                            <td>{moment.utc(p.date_entree).format('DD/MM/YY')}</td>
                            <td>{moment.utc(p.date_sortie).format('DD/MM/YY')}</td>
                            <td>{p.poids_sortie}</td>
                    
                    </tr>
                )
            )
            
        }

        else if(comboBox==='en stock'){
            
            tableCondition = (
                enStock.map(
                    (p, key) =>
                    <tr key={key}>
                            <td>{key+1}</td>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.etape}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                            <td>{p.fk_entrepot}</td>
                            <td>{moment.utc(p.date_entree).format('DD/MM/YY')}</td>
                            
                            
                    
                    </tr>
                )
            )
            
        }
        else if(comboBox==='sortie de stock'){
            
            tableCondition = (
                sortieStock.map(
                    (p, key) =>
                    <tr key={key}>
                            <td>{key+1}</td>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.etape}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                            <td>{p.fk_entrepot}</td>
                            <td>{moment.utc(p.date_entree).format('DD/MM/YY')}</td>
                            <td>{moment.utc(p.date_sortie).format('DD/MM/YY')}</td>
                            <td>{p.poids_sortie}</td>
                    
                    </tr>
                )
            )
            
        }
    
    return ( 
        <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose(); setComboBox ('') ; setSerchValue('')}}>
            <Modal.Header closeButton>
            <Modal.Title>Mouvement de stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{margin:"5%", marginRight:"5%"}}>
                    <div className="mb-4 row agent">
                        <select className="form-select" aria-label="Default select example" id="roleAgent" style={{width:"15%" , marginLeft:"15px"}} value={comboBox} onChange={(e)=> setComboBox(e.target.value)} >
                            <option  selected></option>
                            <option value="etape">Etape</option>
                            <option value="date">Date</option>
                            <option value="en stock">En stock</option>
                            <option value="sortie de stock">sortie de stock</option>
                            
                        </select>
                    
                        <div className="input-group col-sm-9" style={{width:"50%" }}>
                            {barRechereche}
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => recherche(e)} >
                                 <i className="bi bi-search" style={{fontSize: "1.25rem"}}></i>
                            </button>

                        </div>
                    </div>

                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                            <table className="table table-bordered"  >
                            <thead>
                                <tr>
                                <th scope="col"># </th>
                                <th scope="col">ID </th>
                                <th scope="col">Categorie</th>
                                <th scope="col">Nom_produit</th>
                                <th scope="col">Etape</th>
                                <th scope="col">Poids</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Date</th>
                                <th scope="col">Heure</th>
                                <th scope="col">ID enrepot</th>
                                <th scope="col">Date entre au stock</th>
                                {comboBox!== 'en stock' && <th scope="col">Date sortie de stock</th>}
                                {comboBox!== 'en stock' && <th scope="col">Poids des sortie</th>}
                                
                                </tr>
                            </thead>
                            <tbody>
                                {tableGeneral}
                                {tableCondition}
                                
                            </tbody>
                            </table>
                        </div>
                    </div>

                
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={()=> {props.handleClose(); setComboBox ('') ; setSerchValue('')}}>OK</button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default MouvementStock;