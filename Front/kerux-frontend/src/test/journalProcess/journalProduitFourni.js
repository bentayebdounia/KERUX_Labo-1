import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ProcessService from '../../service/service.process'
import moment from 'moment';

const JournalProduitsFournis = (props) => {
    
    const [process, setProcess] = useState([])
    const [processRecherche, setProcessRecheche ] =useState([])
    const [comboBox, setComboBox] = useState('')
    const [serchValue, setSerchValue] = useState('')
    let tableGeneral, tableCondition
    
    useEffect(() => {
        ProcessService.getProduitFourni()
        .then ((res) => {
            setProcess(res.data)
        })
              
    })

    const recherche = (e) => {
        e.preventDefault();
        if (comboBox === 'fournisseur' ) {
            ProcessService.getProduitFourniByNomFournisseur(serchValue)
            .then((res) => {
                setProcessRecheche(res.data)
                console.log(res.data);
            })
        } 
        
    }
   
    if (comboBox===''){
            tableGeneral = (
                process.map(
                    (p, key) =>
                        <tr key={key}>
                            <td>{p.id_bon}</td>
                            <td>{p.nom_fournisseur}</td>
                            <td>{p.acheteur}</td>
                            <td>{p.type_bon}</td>
                            <td>{p.recepteur}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.poids_fourni}</td>
                            <td>{p.nombre_fourni}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                        </tr>
                )
            )
        }

        else if(comboBox==='fournisseur'){
            tableCondition = (
                processRecherche.map(
                    (p, key) =>
                    <tr key={key}>
                       <td>{p.id_bon}</td>
                        <td>{p.nom_fournisseur}</td>
                        <td>{p.acheteur}</td>
                        <td>{p.type_bon}</td>
                        <td>{p.recepteur}</td>
                        <td>{p.categorie}</td>
                        <td>{p.nom_produit}</td>
                        <td>{p.poids_fourni}</td>
                        <td>{p.nombre_fourni}</td>
                        <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                        <td>{p.heure}</td>
                    
                    </tr>
                )
            )
        }
    
    return ( 
        <Modal   fullscreen={true} scrollable={true} show={props.show} onHide={()=> {props.handleClose(); setComboBox ('') ; setSerchValue('')}}>
            <Modal.Header closeButton>
            <Modal.Title>Journal de produits fournis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{margin:"5%", marginRight:"5%"}}>
                    <div className="mb-4 row agent">
                        <select className="form-select" aria-label="Default select example" id="roleAgent" style={{width:"15%" , marginLeft:"15px"}} value={comboBox} onChange={(e)=> setComboBox(e.target.value)} >
                            <option  selected></option>
                            <option value="fournisseur">Nom fournisseur</option>
                            
                        </select>
                    
                        <div className="input-group col-sm-9" style={{width:"50%" }}>
                            <input type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2"  value={serchValue} onChange={(e)=> setSerchValue(e.target.value)} />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => recherche(e)} >
                                <i className="bi bi-search" style={{fontSize: "1.25rem"}}></i>
                            </button>
                        </div>
                    </div>

                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                            <table className="table table-bordered"  >
                            <thead>
                                <tr>
                                <th scope="col">ID bon</th>
                                <th scope="col">Fournisseur</th>
                                <th scope="col">Acheteur</th>
                                <th scope="col">Type de bon</th>
                                <th scope="col">Recepteur</th>
                                <th scope="col">Categorie</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Poids</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Date</th>
                                <th scope="col">Heure</th>
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
 
export default JournalProduitsFournis;