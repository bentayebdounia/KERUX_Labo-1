import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalNote from './note'

const ModelQnote = (props) => {
    const [shownote, setShownote] = useState(false)
    const handleClosenote = () => setShownote(false)
    const handleShownote = () => setShownote(true)
    
    const oui = () => {
        props.handleCloseQnote()
    }

    const non = () => {
        handleShownote()
        props.handleCloseQnote()
    }
    
    return ( 
        <>
            <Modal show={props.showQnote} onHide={props.handleCloseQnote}>
                <Modal.Header closeButton>
                <Modal.Title>Message {props.titre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> vous avez rempli {props.message} % de poids de boxes entrees! Est ce qu'il reste des box non rempli?  </h5>

                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={non}>non</button>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={oui}>oui</button>
                </Modal.Footer>
            </Modal>
            <ModalNote  shownote = {shownote}
                        handleClosenote = {handleClosenote}
                        toggleDisplay = {props.toggleDisplay}

            
            />
        </>
     );
}
 
export default ModelQnote;