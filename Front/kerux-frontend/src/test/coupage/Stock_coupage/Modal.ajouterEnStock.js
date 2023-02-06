import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import ModalAjouterStock from './Modal.ajStock2'
import ModelQnote from './Modal.Qnote'
import '../../../print/modelPrint.css'
import TESTPRINT from '../../../print/ModelPrint';

const ModalQStock = (props) => {
    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

    const [showQnote, setShowQnote] = useState(false)
    const handleCloseQnote = () => setShowQnote(false)
    const handleShowQnote = () => setShowQnote(true)

    
 
    const getEntrepot = () =>{
        //window.print();
        handleShow4()
        props.handleClose3()
       
    }

    const non = () => {

        if(props.PorcentagePoids>90 && props.PorcentagePoids < 100) {
            handleShowQnote()
            
            console.log("PorcentagePoids= " + props.PorcentagePoids)
            
        }
        else {if ( props.PorcentagePoids >= 100  ) props.toggleDisplay()}
        window.print();
        console.log(props.result);
        props.handleClose3 ()

    }
    
   

    return (  
        <>
            <Modal show={props.show3} onHide={props.handleClose3}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter au stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <h3> Voulez-vous vraiment ajouter ce box au stock? </h3>
                   <div className='display-print' style={{display:"none" , margin: '0px'}}>
                            <TESTPRINT id= {props.result} poids= {props.poids} nombre= {props.nombre} categorie={props.categorie} />
                    </div>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ ()=> non ()}>Non</button>
                    <button type="button" className="btn btn-success" onClick={ ()=>getEntrepot() } >Oui</button>
            </Modal.Footer>
             </Modal>

             <ModalAjouterStock 
                                    show4={show4}
                                    handleClose4={handleClose4} 
                                    handleShow4={handleShow4} 
                                    result={props.result}
                                    PorcentagePoids = {props.PorcentagePoids}
                                    toggleDisplay={props.toggleDisplay} 
                                    />
            <ModelQnote
                            showQnote={showQnote}
                            handleCloseQnote={handleCloseQnote}
                            handleShowQnote={handleShowQnote}
                            titre={'coupage'}
                            message={props.PorcentagePoids}
                            toggleDisplay={props.toggleDisplay}
                />
           
        </>
        
        
     )
}
 
export default ModalQStock;



/*

 
*/