import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceStock from '../../service/service.stock'

const ModalAjouterStock = (props) => {
    

    const [entrepot, setEntrepot] = useState()
    const [stock , setStock] = useState()
    

    const  ajouterauStock = async() =>{
        console.log(props.entrepot[0].id_entrepot)
        //var fk_entrepot =  props.entrepot[0].id_entrepot
        await ServiceStock.ajouterStock(props.entrepot[0].id_entrepot).then((res) => {
            setStock(res.data)
            console.log(res.data)
            //console.log(stock.id_stock)
            ServiceStock.modifierProcess(props.result.id_gnerate, res.data.id_stock).then( (res) => {
                console.log(res.data)
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

    return ( 
        <Modal show={props.show4} onHide={props.handleClose4}>
            <Modal.Header closeButton>
                <Modal.Title>Ajoutre au stock</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <select className="form-select" aria-label="Default select example" id="typeBon"  required>
                        <option value="1">frigo1</option>
                </select>
                   
            </Modal.Body>

            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ (e) => annuler ()}> annuler </button>
                    <button type="button" className="btn btn-success" onClick={ (e)=>ajout(e) } > Valider </button>
            </Modal.Footer>
      </Modal>
     );
}
 
export default ModalAjouterStock;