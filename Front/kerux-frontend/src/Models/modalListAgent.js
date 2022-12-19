import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import ServiceAdmin from '../service/serviceAdmin'

const ModalListAgent = (props) => {
    console.log(props.idAgent)
    
    var a = []

    for (var i =0; i< props.id.length ; i++){
        console.log(props.nom[i]);
        a.push (<p> {props.nom[i]}  </p>)
    }
    return ( 
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Liste des agent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <h3 style={{color: "unset"}}> Agents: </h3> 
                   {a}
            </Modal.Body>
            <Modal.Footer>
                    
                    <button type="button" className="btn btn-dark" onClick={props.handleClose}  >Fermer</button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default ModalListAgent;