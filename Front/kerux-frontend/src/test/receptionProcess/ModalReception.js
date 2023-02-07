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
            <Modal.Title>Voulez-vous valider cette réception?</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div class="list-group">

                    <span  className="list-group-item ">  <span className='attributs'>Fournisseur:</span>  {props.nom_fournisseur}  </span>
                    { props.acheteur !==''  &&<span  className="list-group-item  list-group-item-light"> <span className='attributs'>Acheteur:</span> {props.acheteur}</span>}
                    { props.livreur !==''  && <span className="list-group-item  list-group-item-light"> <span className='attributs'>Livreur:</span> {props.livreur} </span>}
                    <span className="list-group-item  list-group-item-light"> <span className='attributs'>Type de bon:</span> {props.type_bon} </span>
                    <span className="list-group-item list-group-item-action list-group-item-light"> <span className='attributs'>Récepteur:</span> {props.recepteur} </span>
                    
                </div>

                   
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose}>annuler</button>
                    <button type="button" className="btn btn-success" onClick={()=>confirmReception() } >Valider</button>
            </Modal.Footer>
      </Modal>

    )
  
}
export default ModalReception;