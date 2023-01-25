import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceEntrepot from '../../service/service.entrepot'
import ModalAjouterStock from './Modal.ajStock2'
import '../../print/modelPrint.css'
import TESTPRINT from '../../print/ModelPrint'
const ModalQStock = (props) => {
    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

    const [entrepot, setEntrepot] = useState()
    

    
    const getEntrepot = () =>{
        
        ServiceEntrepot.getEntrepot()
        .then ((res)=> {
            setEntrepot(res.data)
        })
        window.print();
        handleShow4()
        props.handleClose3()
        
        
    }

    const non = () => {
        window.print();
        props.handleClose3 ()
        props.toggleDisplay()

    }

    const printThermal = () => {
        
    }
    
    console.log(props.result);

    return (  
        <>
            <Modal show={props.show3} onHide={props.handleClose3}>
            <Modal.Header closeButton>
            <Modal.Title>Message de stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <h3> Voulez-vous vraiment ajouter ce box au stock? </h3>

                   <div className='display-print' style={{display:"none" , margin: '0px'}}>
                            <TESTPRINT id= {props.result } poids= {props.poids} nombre= {props.nombre} categorie={props.categorie} />
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
                                    entrepot={entrepot}  
                                    result={props.result}
                                    toggleDisplay={props.toggleDisplay} 
                                    />
        </>
        
        
     )
}
 
export default ModalQStock;