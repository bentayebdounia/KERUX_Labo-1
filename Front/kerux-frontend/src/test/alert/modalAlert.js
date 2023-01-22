import Modal from 'react-bootstrap/Modal'
import React ,{useState,useEffect} from 'react'
import Alert from 'react-bootstrap/Alert';
import serviceAlert from '../../service/service.alert'
const ModelAlert = (props) => {
    const [alertDanger, setAlertdanger] = useState([])
    const [alertWarnning, setAlertwarnning] = useState([])
    const [alertPrimary, setAlertprimary] = useState([])

    const dateAlert = (n) => {
        const d = new Date
        
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+n)
    }
    useEffect(()=>{
        serviceAlert.alertData(dateAlert(0)).then((res)=> {
            setAlertdanger(res.data)
            
        })
        serviceAlert.alertData(dateAlert(1)).then((res)=> {
            setAlertwarnning(res.data)
            
        })
        serviceAlert.alertDataPrimary(dateAlert(2)).then((res)=> {
            setAlertprimary(res.data)
            
        })

    })

    
    
    return ( 
        <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> <i className="bi bi-bell-fill" style={{color: "black"}}  > </i> ALERT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ marginLeft:"5%", marginRight:"5%"}}>
                

                {alertDanger.map ( (key) =>
                    <Alert variant={'danger'}>
                    <i className="bi-exclamation-octagon-fill me-2"></i>
                       Le produit de ID: {key.id_gnerate} est en attente à l'étape: {key.etape}  
                    </Alert>
)}
                    {alertWarnning.map ( (key) =>
                        <Alert variant={'warning'}>
                        <i className="bi-exclamation-triangle-fill me-2"></i>
                        Le produit de ID: {key.id_gnerate} est en attente à l'étape: {key.etape}  
                    </Alert>
                    )}

                    {alertPrimary.map ( (key) =>
                        <Alert variant={'primary'}>
                        <i className="bi-info-circle-fill me-2"></i>
                        Le produit de ID: {key.id_gnerate} est en attente à l'étape: {key.etape}  
                    </Alert>
                    )}
                </div>
                   
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={props.handleClose}>OK</button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default ModelAlert;