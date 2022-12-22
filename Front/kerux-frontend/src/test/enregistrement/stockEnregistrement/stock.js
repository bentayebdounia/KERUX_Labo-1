import Modal from 'react-bootstrap/Modal'
import React ,{useState,useEffect} from 'react'
import ServiceEntrepot from '../../../service/service.entrepot'

import ServiceStock from '../../../service/service.stock'

const Stock = (props) => {
    
    const [entrepots, setEntrepots] = useState([])
    const [entrepot, setEntrepot] = useState()
    const [stock , setStock] = useState()
    const tableBox =[...props.tableBox]

    useEffect(()=> {
        ServiceEntrepot.getEntrepot()
        .then ((res)=> {
            setEntrepots(res.data)
            
        })
    })
    
    return ( 
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Message </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select className="form-select" aria-label="Default select example" id="typeBon" value={entrepot} onChange={(e)=> setEntrepot(e.target.value)}  required>
                                    <option defaultValue={""}></option>
                                    {entrepots.map( (entrepot,key) =>
                                        
                                        <option value={entrepot.id_entrepot}> {entrepot.nom_entrepot} </option>
                                    )}
                                    
                                </select>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={props.handleClose}>OK</button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default Stock;