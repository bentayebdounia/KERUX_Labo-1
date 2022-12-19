import Modal from 'react-bootstrap/Modal'
import {ReactToPrint} from 'react-to-print'
import { Button } from "react-bootstrap";
import React ,{useState,useRef} from 'react'
const Print = (props) => {
    
    let componentRef = useRef();
    
    return ( 
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Message {props.titre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                         <ReactToPrint  
                                        trigger={() => <Button>Print this out!</Button>}
                                        content= {() => componentRef}
                                        documentTitle ='id nettoyage'
                                        pageStyle = "print"
                        />
                   
                    <div ref={(el) => (componentRef = el)}>
                        <div>id: {props.result}</div>
                        <div>{props.poids}</div>
                        <div>{props.nombre}</div>
                        <div> {props.result}</div>
                        <div> {props.result}</div>
                    </div>
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={props.handleClose}>OK</button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default Print;