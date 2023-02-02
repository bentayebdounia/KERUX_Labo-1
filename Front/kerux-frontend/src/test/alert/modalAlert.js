import Modal from 'react-bootstrap/Modal'
import React ,{useState,useEffect} from 'react'
import Alert from 'react-bootstrap/Alert';
import serviceAlert from '../../service/service.alert'

import TestNet from '../nettoyageProcess/testNet'
import TestCoupage from '../coupage/TestCoupage'

import TestCondit from '../conditionnemet/testCondit'
import TestSortie from '../sortieProcess/TestSortie'
import moment from 'moment'; 
const ModelAlert = (props) => {
    const [alertDanger, setAlertdanger] = useState([])
    const [alertWarnning, setAlertwarnning] = useState([])
    const [alertPrimary, setAlertprimary] = useState([])

    const [controleNettoyage, setControleNettoyage] = useState(false)
    const [controleCoupage, setControleCoupage] = useState(false)
    const [controleCondit, setControleCondit] = useState(false)
    const [controleSortie, setControleSortie] = useState(false)

   

    const dateAlert = (n) => {
        const d = new Date
        
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+n)
    }
    useEffect(()=>{
      /*  serviceAlert.alertData(dateAlert(0)).then((res)=> {
            setAlertdanger(res.data)
            
        })
        serviceAlert.alertData(dateAlert(1)).then((res)=> {
            setAlertwarnning(res.data)
            
        })*/
        serviceAlert.alertDataPrimary(dateAlert(0)).then((res)=> {
            setAlertprimary(res.data)
            
        })

    },[])

    const dateNow = (date1) => {
        var date=  moment.utc(date1).format('DD-MM-YYYY')
        const words = date.split('-');
        //var a = parseInt(words[0])+'-'+(words[1])+'-'+(words[2])

        var d = new Date(words[2], words[1]-1 ,words[0]);
        var nextDay = new Date(d.getTime());
        nextDay.setDate(d.getDate() + 1);
        console.log(nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

        return nextDay.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    const dateRester = (dateAlert) => {
        var date1 = new Date (dateAlert)
        var date2 = new Date
        console.log(dateAlert)
        var diffTime = Math.abs(  date1 - date2);

        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

       // console.log(diffTime);
        return diffDays
    }


    const colorAlert = ( dateAlert) => {
        if (dateRester(dateAlert) <=3) return 'danger'
        else if (dateRester(dateAlert) > 3  && dateRester(dateAlert) <=5) return 'warning'
        else return 'primary'

    }

    const click = (etape) => {
        if (etape === 'enregistrement'){
            setControleNettoyage(true)
            console.log(' click enregistrement ' );
            //props.handleClose()
            }
        else if (etape === 'nettoyage'){
            
            setControleCoupage(true)
           // console.log(' click nettoyage ');
           // props.handleClose()
        }
        else if (etape === 'coupage'){
            setControleCondit(true)
           // console.log(' click coupage ');
           // props.handleClose()
        }
        else if (etape === 'conditionnement'){
            setControleSortie(true)
           // console.log(' click conditionnement ');
            //props.handleClose()
        }
        
    }
    
    return ( 
        <>
            <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title> <i className="bi bi-bell-fill" style={{color: "black"}}  > </i> ALERTE </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ marginLeft:"5%", marginRight:"5%"}}>
                    

                    {alertDanger.map ( (key) =>
                        <Alert variant={'danger'}>
                            <div onClick={() =>{click(key.etape)}}>
                                <i className="bi-exclamation-octagon-fill me-2" ></i>
                                Le produit de ID: <span style={{fontWeight:"bold"}}> {key.id_gnerate} </span>  est en attente à l'étape: <span style={{fontWeight:"bold"}}> {key.etape} </span>
                        </div>
                        </Alert>
    )}
                        {alertWarnning.map ( (key) =>
                            <Alert variant={'warning'}>
                                <div onClick={() =>{click(key.etape)}}>
                                    <i className="bi-exclamation-triangle-fill me-2"></i>
                                    Le produit de ID: <span style={{fontWeight:"bold"}}> {key.id_gnerate} </span> est en attente à l'étape: <span style={{fontWeight:"bold"}}> {key.etape} </span>  
                                </div>
                            </Alert>
                        )}

                        {alertPrimary.map ( (key) =>
                            
                          
                             <Alert variant={colorAlert(key.date_alert)}>
                                <div onClick={() =>{click(key.etape)}}>
                                    <i className="bi-info-circle-fill me-2"></i>
                                    Le produit de ID: <span style={{fontWeight:"bold"}}> {key.id_gnerate} </span> est en attente à l'étape: <span style={{fontWeight:"bold"}}> {key.etape} </span>   
                                    <br/>
                                    il vous reste <span style={{fontWeight:"bold"}}> {dateRester( key.date_alert)} jours </span>  
                                    
                                </div>
                            </Alert>
                        )}
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={props.handleClose}>OK</button>
                </Modal.Footer>
            </Modal>

           
            {controleNettoyage && <TestNet  />}
            {controleCoupage && <TestCoupage />}
            {controleCondit && <TestCondit />}
            {controleSortie && <TestSortie />}
        </>
     );
}
 
export default ModelAlert;