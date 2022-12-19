import React ,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import AjouterStock from './ajouterStock'

const ModalQStock = (props) => {

    const [showAjouterStock, setShowAjouterStock] = useState(false)
    const handleCloseAjouterStock = () => setShowAjouterStock(false)
    const handleShowAjouterStock  = () => setShowAjouterStock(true)

    
    

    
    const oui = () =>{
        
        handleShowAjouterStock()
        props.handleClose()
        
        
    }

    const non = () => {
        props.handleClose()
        
    }
    
   console.log(props.tableBox);

    return (  
        <>
            <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Message de stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <h3> Voulez-vous vraiment ajouter ces boxes au stock? </h3>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ ()=> non ()}>Non</button>
                    <button type="button" className="btn btn-success" onClick={ ()=>oui() } >Oui</button>
            </Modal.Footer>
             </Modal>

             {showAjouterStock && <AjouterStock 
                                 show= {showAjouterStock}
                                 handeshow = {handleShowAjouterStock}
                                 handleClose = {handleCloseAjouterStock}
                                 tableBox = {props.tableBox}

            
            />}
             
        </>
        
        
     )
}
 
export default ModalQStock;