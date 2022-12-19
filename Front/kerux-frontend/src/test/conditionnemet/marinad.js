import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import MarinadeService from '../../service/service.marinade'
import ModelReponse from '../../Models/Model.repense'
import ModalListAgent from '../../Models/modalListAgent'
import ServiceAdmin from '../../service/serviceAdmin'


const ModalMarinade = (props) => {
    const [idAgent, setIdAgent]= useState([])
    const [agent , setAgent] = useState('')

    const [marine, setMarine]= useState(false)
    const [miCuissan, setMiCuissan]= useState(false)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const handleChange = (data) => {
        if(data === 'marine'){
            
                setMarine(!marine)
                console.log(marine);    
                console.log('marine '+marine)
            
        }
    }
    const handleChange2 = (data) => {
        if(data === 'mi-cuissan'){
            
                setMiCuissan(!miCuissan)
                console.log(miCuissan);
                //console.log('mi-cuissan '+miCuissan);
            
            
        }
    }

    const confirmMarinade = (e) => {
        e.preventDefault();
        var etape="marinade"
        
        //categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni

        //categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, id_nettoyage, id_coupage, fk_proditFourni
        MarinadeService.ajouterMarinade( props.process.categorie, props.process.nom_produit, etape, props.process.poids, props.process.nombre, marine, miCuissan, props.process.id_nettoyage, props.id_box, props.process.fk_proditfourni)
        .then( (res)=> {
            console.log(res.data)
        
        })  
        props.handleClose2()
    }

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [message,setMessage] = useState()
    
    const [nomAgent, setNomAgent ] = useState([])

    const ajouterAgent=(e) => {
        e.preventDefault()
        ServiceAdmin.getPersonneById(agent)
        .then ( (res)=> {
            if(res.data==="ID n'existe pas"){
                console.log(res.data);
                setMessage("ID n'existe pas")
                handleShow3()
            
            }
                

            else{
                setNomAgent(current => [...current , res.data[0].nom +" "+ res.data[0].prenom])
                setIdAgent(current => [...current, agent]);
                console.log("ajouter agent "+ idAgent)
                setAgent('')
            }
        })
        
        console.log(agent)
        
    }
        var mi_cuissan

        if(props.process.nom_produit !== 'tendres'){
            mi_cuissan =(
                <>
                    <div>
                        <Form.Check aria-label="option 1" label="Mi-cuissan" value={miCuissan} onChange= {()=> handleChange2('mi-cuissan')}/>
                    </div>
                </>
            )
        }

    return ( 
        <>
            <Modal show={props.show2} onHide={props.handleClose2}> 
                <Modal.Header closeButton>
                <Modal.Title>Marinade </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 row">
                        <label for="categorie"  className="col-sm-2 col-form-label"> Type de produit</label>
                        <div className="col-sm-10">
                            <input type="text"  className="form-control" id="categorie" readOnly={props.process.nom_produit} defaultValue={props.process.nom_produit}  required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="recepteur"  className="col-sm-2 col-form-label">Agent de marinade</label>
                        <div className="col-sm-10">
                        <div className="input-group">
                            <input type="number" className="form-control" id="agentIdNettoyage" placeholder="" value={agent} onChange={(e)=> setAgent(e.target.value)}/>
                            <button className="btn btn-dark btn-outline-dark" type="button" onClick={(e)=>ajouterAgent(e)}>
                                <i className="bi bi-plus" style={{color: "white"}}> </i>
                            </button>
                            <button className="btn btn-dark btn-outline-dark" type="button" onClick={handleShow2} >
                                <i className="bi bi-person-lines-fill" style={{color: "white"}}> </i>
                            </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Form.Check aria-label="option 1" label="Marinade" value={marine} onChange= {()=> handleChange('marine')} />
                        {mi_cuissan}
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose2}>Annuler</button>
                        <button type="button" className="btn btn-success" onClick={(e)=>confirmMarinade(e)}>Valider</button>
                </Modal.Footer>
            </Modal>

            <ModelReponse show={show3} handleClose={handleClose3} handleShow={handleShow3}
                                    message={message} 
                                    titre={"marinade"} 
                                    />

            <ModalListAgent             show={show2} 
                                        handleClose={handleClose2} 
                                        handleShow={handleShow2} 
                                        id={idAgent}
                                        nom={nomAgent}
                                        />

           
        </>
     )
}
 
export default ModalMarinade;