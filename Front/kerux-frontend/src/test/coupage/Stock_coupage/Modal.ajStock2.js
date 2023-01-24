import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceStock from '../../../service/service.stock'
import ModelQnote from './Modal.Qnote'
import ServiceEntrepot from '../../../service/service.entrepot'

const ModalAjouterStock = (props) => {
    

    const [entrepots, setEntrepots] = useState([])
    const [stock , setStock] = useState()
    const [entrepot, setEntrepot] = useState()

    const [showQnote, setShowQnote] = useState(false)
    const handleCloseQnote = () => setShowQnote(false)
    const handleShowQnote = () => setShowQnote(true)

    useEffect(()=> {
        ServiceEntrepot.getEntrepot()
        .then ((res)=> {
            setEntrepots(res.data)
            
        })
    })
    

    const  ajouterauStock = async() =>{
       
        await ServiceStock.ajouterStock(entrepot).then((res) => {
            setStock(res.data)
            console.log(res.data)
            //console.log(stock.id_stock)
            ServiceStock.modifierProcess(props.result.id_gnerate, res.data.id_stock).then( (res) => {
                console.log(res.data)
            })
            
        })     
    }
  

    const ajout = async() => {
        
        await ajouterauStock()

        if(props.PorcentagePoids >90 && props.PorcentagePoids < 100) {
            handleShowQnote()
            
            console.log("PorcentagePoids= " + props.PorcentagePoids)
            
        }
        else if ( props.PorcentagePoids >= 100) props.toggleDisplay()

        
        props.handleClose4()
        
        
    }

    const annuler = () => {
        
            if(props.PorcentagePoids >90) {
                handleShowQnote()
                
                console.log("PorcentagePoids= " + props.PorcentagePoids)
                
            }
            
    
        
        props.handleClose4()
        
    }

    return ( 
        <>
            <Modal show={props.show4} onHide={props.handleClose4}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajoutre au stock</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <select className="form-select" aria-label="Default select example" id="typeBon" value={entrepot} onChange={(e)=> setEntrepot(e.target.value)}  required>
                            <option defaultValue={""}></option>
                            {entrepots.map( (entrepot,key) =>
                                
                                <option value={entrepot.id_entrepot}> {entrepot.nom_entrepot} </option>
                            )}
                            
                    </select>
                    
                </Modal.Body>

                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ annuler}> annuler </button>
                        <button type="button" className="btn btn-success" onClick={ ajout } > Valider </button>
                </Modal.Footer>

        </Modal>
        <ModelQnote
                        showQnote={showQnote}
                        handleCloseQnote={handleCloseQnote}
                        handleShowQnote={handleShowQnote}
                        titre={'coupage'}
                        message={props.PorcentagePoids}
                        toggleDisplay={props.toggleDisplay}
                    />
                </>
     );
}
 
export default ModalAjouterStock;