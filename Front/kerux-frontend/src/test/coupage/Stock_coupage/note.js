import Modal from 'react-bootstrap/Modal'

const ModelNote = (props) => {

    
    const enregistrer = () => {
        props.handleClosenote()
        props.toggleDisplay()
    }
    return ( 
        <Modal show={props.shownote} onHide={props.handleClosenote}>
            <Modal.Header closeButton>
            <Modal.Title>Message </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <h5>Enter une note: </h5>
                   <div class="mb-3">
                        <label forHtml="message-text" className="col-form-label">Note:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>

                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={enregistrer}>ENREGISTRER</button>
                    
            </Modal.Footer>
      </Modal>
     );
}
 
export default ModelNote;