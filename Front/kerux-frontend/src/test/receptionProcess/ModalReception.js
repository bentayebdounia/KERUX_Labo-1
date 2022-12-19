import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceProcess from '../../service/service.process'


const ModalReception = (props) => {

 

  const confirmReception = () => {
    
    console.log(props.recepteur)

   
       
    /*  
    ServiceProcess.ajouterBon(props.nom_fournisseur, props.acheteur, props.type_bon, props.recepteur).then( (res)=> {
            console.log(res.data)
            
        })*/
        props.handleClose() // fermer le modal
        props.toggleConfirmeTrue()  //valider 
        
       
    
    
    
       
    }
    
    return (
      <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Voulez-vous valider?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <p style = {{fontWeight: "bold"}} >Fournisseur:  </p>  {props.nom_fournisseur}  
                   
                   <p style = {{fontWeight: "bold"}} >Acheteur:  </p>  {props.acheteur} 
                   
                   <p style = {{fontWeight: "bold"}}>Type de bon:  </p>  {props.type_bon} 
                   
                   <p style = {{fontWeight: "bold"}} >Récepteur:  </p>   {props.recepteur}
                   
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose}>annuler</button>
                    <button type="button" className="btn btn-success" onClick={()=>confirmReception() } >Valider</button>
            </Modal.Footer>
      </Modal>

    )
  
}
export default ModalReception;