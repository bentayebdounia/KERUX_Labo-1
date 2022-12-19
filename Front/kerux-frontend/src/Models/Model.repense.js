import Modal from 'react-bootstrap/Modal'

const ModelReponse = (props) => {
    
    
    return ( 
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Message {props.titre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <h5> {props.message} </h5>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={props.handleClose}>OK</button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default ModelReponse;