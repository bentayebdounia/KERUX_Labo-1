import React ,{useState,createRef} from 'react'
import Modal from 'react-bootstrap/Modal'
import {useReactToPrint} from "react-to-print";
import ModalAjouterStock from './Modal.ajStock2'
import ModelQnote from './Modal.Qnote'
import '../../../print/modelPrint.css'
import { Bill } from '../bill'
import "../appp.css";

const ModalQStock = (props) => {
    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

    const [showQnote, setShowQnote] = useState(false)
    const handleCloseQnote = () => setShowQnote(false)
    const handleShowQnote = () => setShowQnote(true)
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

        if(props.PorcentagePoids>90 && props.PorcentagePoids < 100) {
            handleShowQnote()
            
           // console.log("PorcentagePoids= " + props.PorcentagePoids)
            
        }
        else {if ( props.PorcentagePoids >= 100  ){ 
                   props.btnC()
                  props.toggleDisplay()
                }}
        handleBillPrint()
       // console.log(props.result);
        props.handleClose3 ()

    }
    
    console.log("p= "+props.poids);
 console.log("n= "+props.nombre);
   

    return (  
        <>
            <Modal show={props.show3} onHide={props.handleClose3}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter au stock</Modal.Title>
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