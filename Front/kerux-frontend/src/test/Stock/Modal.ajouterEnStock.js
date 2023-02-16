import React ,{useState,createRef} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceEntrepot from '../../service/service.entrepot'
import ModalAjouterStock from './Modal.ajStock2'
import '../../print/modelPrint.css'

import { Bill } from '../../print/bill'
import {useReactToPrint} from "react-to-print";
import "../coupage/appp.css";

const ModalQStock = (props) => {
    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

    const [entrepot, setEntrepot] = useState()
    
    const billRef = createRef();
 

  // Send print request to the Main process
  const handlePrint = function (target) {
    return new Promise(() => {
      console.log("forwarding print request to the main process...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      //console.log(data);
      const blob = new Blob([data], {type: "text/html"});
      const url = URL.createObjectURL(blob);

      window.electronAPI.printComponent(url, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };

  const handleBillPrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: "Bill component",
    print: handlePrint,
  });

    
    const getEntrepot = () =>{
        
       
        handleBillPrint()
        handleShow4()
        props.handleClose3()
        
        
    }

    const non = () => {
        
        props.handleClose3 ()
        props.toggleDisplay()

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

                   
                   <div style={{display:"none"}}>
                        <Bill ref={billRef}
                              id={props.result}
                              poids= {props.poids}
                              nombre= {props.nombre}
                              categorie = {props.categorie}
                        />
                   </div>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ ()=> {non (); handleBillPrint()}}>Non</button>
                    <button type="button" className="btn btn-success" onClick={ ()=>{getEntrepot() ; handleBillPrint()} } >Oui</button>
            </Modal.Footer>
             </Modal>

             {show4 && <ModalAjouterStock 
                                    show4={show4}
                                    handleClose4={handleClose4} 
                                    handleShow4={handleShow4} 
                                    entrepot={entrepot}  
                                    result={props.result}
                                    toggleDisplay={props.toggleDisplay} 
                                    
                                    />}
        </>
        
        
     )
}
 
export default ModalQStock;