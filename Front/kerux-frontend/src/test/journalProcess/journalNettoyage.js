import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import NettoyageService from '../../service/service.nettoyage'
import EnregistrementService from '../../service/service.enregistrement'
import serviceCoupage from '../../service/service.coupage'
import serviceCondi from '../../service/service.condit'
import serviceMarinade from '../../service/service.marinade';
import serviceSorti from '../../service/service.sorti'
import serviceEnregistrement from '../../service/service.enregistrement'
import moment from 'moment';

const JournalNettoyage = (props) => {
    
    const [process, setProcess] = useState([])
    const [processRecherche, setProcessRecheche ] =useState([])
    const [comboBox, setComboBox] = useState('')
    const [serchValue, setSerchValue] = useState('')
    let tableGeneral, tableCondition
    
    useEffect(() => {
        if (props.journalprocess==='enregistrement'){
            EnregistrementService.getProcessByDateHeure()
            .then ((res) => {
                setProcess(res.data)
            })
        }
        else if(props.journalprocess==='nettoyage'){
            NettoyageService.getProcessByDateHeure()
            .then ((res)=>{
                setProcess(res.data)
            })}
        else if (props.journalprocess==='coupage'){
            serviceCoupage.getProcessByDateHeure()
            .then ((res) => {
                setProcess(res.data)
            })
        }
        else if (props.journalprocess==='conditionnement'){
            serviceCondi.getProcessByDateHeure()
            .then ((res) => {
                setProcess(res.data)
            })
        }
        else if (props.journalprocess==='marinade'){
            serviceMarinade.getProcessByDateHeure()
            .then ((res) => {
                setProcess(res.data)
            })
        }
        else if (props.journalprocess==='sortie'){
            serviceSorti.getProcessByDateHeure()
            .then ((res) => {
                setProcess(res.data)
            })
        }
              
    })

    const recherche = (e) => {
        e.preventDefault();
        if(props.journalprocess === 'enregistrement') {
           if (comboBox ==='id_gnerate'){
                console.log("comboBox= "+ comboBox);
                serviceEnregistrement.getProcessByEtapes_idGnerate(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }

            else if (comboBox ==='categorie'){
                console.log("comboBox= "+ comboBox);
                serviceEnregistrement.getProcessByEtapes_categorie(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
            else if (comboBox ==='nom_produit'){
                console.log("comboBox= "+ comboBox);
                serviceEnregistrement.getProcessByEtapes_produit(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
        }

        else if(props.journalprocess === 'nettoyage') {
            if (comboBox ==='id_gnerate'){
                console.log("comboBox= "+ comboBox);
                NettoyageService.getProcessByEtapes_idGnerate(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }

            else if (comboBox ==='categorie'){
                console.log("comboBox= "+ comboBox);
                NettoyageService.getProcessByEtapes_categorie(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
            else if (comboBox ==='nom_produit'){
                console.log("comboBox= "+ comboBox);
                NettoyageService.getProcessByEtapes_produit(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
        }

        else if(props.journalprocess === 'coupage') {
            console.log("enregistrement");
            if (comboBox ==='id_gnerate'){
                console.log("comboBox= "+ comboBox);
                serviceCoupage.getProcessByEtapes_idGnerate(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }

            else if (comboBox ==='categorie'){
                console.log("comboBox= "+ comboBox);
                serviceCoupage.getProcessByEtapes_categorie(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
            else if (comboBox ==='nom_produit'){
                console.log("comboBox= "+ comboBox);
                serviceCoupage.getProcessByEtapes_produit(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
        }

        else if(props.journalprocess === 'conditionnement') {
            if (comboBox ==='id_gnerate'){
                console.log("comboBox= "+ comboBox);
                serviceCondi.getProcessByEtapes_idGnerate(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }

            else if (comboBox ==='categorie'){
                console.log("comboBox= "+ comboBox);
                serviceCondi.getProcessByEtapes_categorie(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
            else if (comboBox ==='nom_produit'){
                console.log("comboBox= "+ comboBox);
                serviceCondi.getProcessByEtapes_produit(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
        }

        else if(props.journalprocess === 'marinade') {
            if (comboBox ==='id_gnerate'){
                serviceMarinade.getProcessByEtapes_idGnerate(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }

            else if (comboBox ==='categorie'){
                serviceMarinade.getProcessByEtapes_categorie(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
            else if (comboBox ==='nom_produit'){
                serviceMarinade.getProcessByEtapes_produit(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
        }

        else if(props.journalprocess === 'sortie') {
            if (comboBox ==='id_gnerate'){
                serviceSorti.getProcessByEtapes_idGnerate(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }

            else if (comboBox ==='categorie'){
                serviceSorti.getProcessByEtapes_categorie(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
            else if (comboBox ==='nom_produit'){
                serviceSorti.getProcessByEtapes_produit(serchValue)
                .then((res) => {
                    setProcessRecheche(res.data)
                    console.log(res.data);
                })
            }
        }
    }
   
    if (comboBox===''){
            tableGeneral = (
                process.map(
                    (p, key) =>
                        <tr key={key}>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                        </tr>
                )
            )
        }

        else{
            tableCondition = (
                processRecherche.map(
                    (p, key) =>
                        <tr key={key}>
                            <td>{p.id_gnerate}</td>
                            <td>{p.categorie}</td>
                            <td>{p.nom_produit}</td>
                            <td>{p.poids}</td>
                            <td>{p.nombre}</td>
                            <td>{moment.utc(p.datee).format('DD/MM/YY')}</td>
                            <td>{p.heure}</td>
                        </tr>
                )
            )
        }
    
    return ( 
        <Modal size="lg" scrollable={true} show={props.show} onHide={()=> {props.handleClose(); setComboBox ('') ; setSerchValue('')}}>
            <Modal.Header closeButton>
            <Modal.Title>Journal {props.journalprocess}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{margin:"5%", marginRight:"5%"}}>
                    <div className="mb-4 row agent">
                        <select className="form-select" aria-label="Default select example" id="roleAgent" style={{width:"20%" , marginLeft:"30px"}} value={comboBox} onChange={(e)=> setComboBox(e.target.value)} >
                            <option  selected></option>
                            <option value="id_gnerate">ID</option>
                            <option value="categorie">categorie</option>
                            <option value="nom_produit">nom de Produit</option>
                        </select>
                    
                        <div className="input-group col-sm-9">
                            <input type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2" value={serchValue} onChange={(e)=> setSerchValue(e.target.value)} />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => recherche(e)} >
                                <i className="bi bi-search" style={{fontSize: "1.25rem"}}></i>
                            </button>
                        </div>
                    </div>

                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                            <table className="table table-bordered"  >
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Categorie</th>
                                <th scope="col">Nom produit</th>
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
 
export default JournalNettoyage;