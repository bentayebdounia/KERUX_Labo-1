import React ,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceEntrepot from '../../service/service.entrepot'

const AjouterEntrepot = (props) => {
    
    const [nomEntrepot, setNomEtrepot] = useState()
    const [type , setType] = useState()
    const [airStock, setAirStock] = useState()
    const[ capacite, setCapacite] = useState()
    const [adr, setAdr] = useState()
    
    const ajouterEntrepot = async (e) => {
        e.preventDefault()
        await ServiceEntrepot.getEntrepot(nomEntrepot, type, airStock, capacite, adr)
        .then(
            (res)=>{
                    console.log(res.data);
            }
        )
    }
    
    

    const non = () => {
        props.handleClose ()
       

    }
    
    //console.log(entrepot);

    return (  
        <>
            <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter un entrepot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                        <div className="mb-3 row">
                            <label for="nomAgent"  className="col-sm-2 -form-label ">Nom d'entrepot</label>
                            <div className="col-sm-10">
                            <input  type="text"  className="form-control" colid="nomAgent" value={nomEntrepot} onChange={(e)=> setNomEtrepot(e.target.value)}  required/>
                            </div>
                            
                        </div>

                        <div className="mb-3 row">
                            <label for="roleAgentAjout" className="col-sm-2 col-form-label">Type d'entrepot</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={type} onChange={(e)=> setType(e.target.value)}  required>
                                    <option selected></option>
                                    <option value="chambre froide">Chambre froide</option>
                                    <option value="entrepot">Entrepot</option>
                                    
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="roleAgentAjout" className="col-sm-2 col-form-label">L'air de stockage</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={airStock} onChange={(e)=> setAirStock(e.target.value)} required>
                                    <option selected></option>
                                    <option value="Refrigerer -positif">Refrigerer -positif</option>
                                    <option value="Refrigerer -negatif">Refrigerer -negatif</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="prenomAgent" className="col-sm-2 col-form-label " >Capacite</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="prenomAgent" value={capacite} onChange={(e)=> setCapacite(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="prenomAgent" className="col-sm-2 col-form-label " >Adresse</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="prenomAgent" value={adr} onChange={(e)=> setAdr(e.target.value)} required/>
                            </div>
                        </div>
                   
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ ()=> non ()}>annuler</button>
                    <button type="button" className="btn btn-success" onClick={ (e)=>ajouterEntrepot(e) } >Enregistrer</button>
            </Modal.Footer>
            </Modal>

             
        </>
        
        
     )
}
 
export default AjouterEntrepot;