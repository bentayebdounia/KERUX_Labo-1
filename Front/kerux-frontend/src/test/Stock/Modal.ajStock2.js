import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceStock from '../../service/service.stock'
import ServiceEntrepot from '../../service/service.entrepot'
import serviceAlert from '../../service/service.alert'

const ModalAjouterStock = (props) => {
   

    const [entrepots, setEntrepots] = useState([])
    const [entrepot, setEntrepot] = useState()
    const [stock , setStock] = useState()
    const [dateAlert, setDatealert] = useState()
    
    useEffect(()=> {
        ServiceEntrepot.getEntrepot()
        .then ((res)=> {
            setEntrepots(res.data)
            
        })
    })
    const  ajouterauStock = async() =>{
       // console.log(entrepot)
        //var fk_entrepot =  props.entrepot[0].id_entrepot
        await ServiceStock.ajouterStock(entrepot).then((res) => {
            setStock(res.data)
            //console.log(res.data)
            //console.log(stock.id_stock)
            ServiceStock.modifierProcess(props.result.id_gnerate, res.data.id_stock).then( (res) => {
                //console.log(res.data)
            })
            serviceAlert.updateDateAlert(props.result.id_process, dateAlert ).then( (res) => {
                console.log(res.data)
                //alert (res.data)
            })
            
        })     
    }

    

    const ajout = async(e) => {
        e.preventDefault();
        await ajouterauStock()
        props.handleClose4()
        props.toggleDisplay()
    }

    const annuler = () => {
        props.handleClose4()
        props.toggleDisplay()
    }
//console.log('date alert = '+dateAlert);
    return ( 
        <Modal show={props.show4} onHide={props.handleClose4}>
            <Modal.Header closeButton>
                <Modal.Title>Ajoutre au stock</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <label>Entrepot</label>

                    <select className="form-select" aria-label="Default select example" id="entrepot" value={entrepot} onChange={(e)=> setEntrepot(e.target.value)}  required>
                                    <option defaultValue={""}></option>
                                    {entrepots.map( (entrepot,key) =>
                                        
                                        <option value={entrepot.id_entrepot}> {entrepot.nom_entrepot} | {entrepot.air_stockage} </option>
                                    )}
                                                
                    </select>
                </div>

                <div>
                    <label>Date d'alerte</label>
                    <input type="date" className="form-control" value={dateAlert} onChange={(e)=> setDatealert(e.target.value)} />
                </div>
                
                   
            </Modal.Body>

            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ (e) => annuler ()}> annuler </button>
                    <button type="button" className="btn btn-success" onClick={ (e)=>ajout(e) } > Valider </button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default ModalAjouterStock;