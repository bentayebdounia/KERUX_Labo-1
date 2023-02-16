import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

const ModalAfficherMarinade = (props) => {
    return ( 
        <>
            <Modal size='lg' show={props.show} onHide={props.handleClose}> 
                <Modal.Header closeButton>
                <Modal.Title> Marinade </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="list-group">
                    
                    
                    <span className="list-group-item  list-group-item-light"> <span className='attributs'>Type de produit:</span> {props.process.nom_produit} </span>
                    <span className="list-group-item  list-group-item-light"> <span className='attributs'>Agent:</span> 
                        
                            {props.agents.map((value) => {
                                                return (
                                                    
                                                <li > {value.id_personne} . {value.nom} {value.prenom} </li>
                                                    
                                                )
                                            })}
                        
                    </span>
                    {props.marinade && 
                                    <span className="list-group-item list-group-item-action list-group-item-light">     
                                        <span className='attributs'>Marinade</span>     
                                        <i className="bi bi-check-circle-fill" style={{color: "#4F8B2A" , fontSize:"20px"}}></i> 
                                    </span>}
                                    
                    {props.micuissan && 
                                    <span className="list-group-item list-group-item-action list-group-item-light"> 
                                        <span className='attributs'>Mi-cuissan</span> 
                                        <i className="bi bi-check-circle-fill" style={{color: "#4F8B2A" , fontSize:"20px"}}></i>
                                    </span>
                    }
                    
                </div>
        
                </Modal.Body>
                
            </Modal>

            
        </>
     );
}
export default ModalAfficherMarinade