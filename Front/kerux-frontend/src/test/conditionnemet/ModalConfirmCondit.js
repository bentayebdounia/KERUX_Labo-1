import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import ConditService from '../../service/service.condit'
import ModalQStock from '../coupage/Stock_coupage/Modal.ajouterEnStock'
import serviceAlert from '../../service/service.alert'

const ModalConfirmCondit = (props) => {

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [result, setResult] = useState()

    const ajouterCle = (categorie, type, numeroBox) => {
        if (categorie === "poulet"){
            if (type === "poulet") return 'PP'+ numero_box(numeroBox)
            else if (type === "tendres") return 'PT'+ numero_box(numeroBox)
                 else if (type === "wings") return 'PW'+ numero_box(numeroBox)
                      else if (type === "dips") return 'PD'+ numero_box(numeroBox)
                            else if (type === "hotDogs") return 'PH'+ numero_box(numeroBox)
                                 else if (type === "legs") return 'PL'+ numero_box(numeroBox)
        }

        else if (categorie === "legume"){
            if (type === "frite") return 'LF'+ numero_box(numeroBox)
            else if (type === "laitue") return 'LL'+numero_box(numeroBox)
                else if (type === "tomate") return 'LT'+numero_box(numeroBox)
                    else if (type === "oignon") return 'LO'+numero_box(numeroBox)
                            else if (type === "choux") return 'LCH'+numero_box(numeroBox)
                                else if (type === "carotte") return 'LC'+numero_box(numeroBox)
        }

            else return 'A'+numeroBox
    }

    const numero_box = (n) =>
    {
        if (n >0 && n<10) return (0+''+n)
        else return n
    }
    
    const dateAlert = () => {
        const d = new Date
       return d
    }
    
    const confirmNCondit = async (e) => {
        e.preventDefault();
        var etape="conditionnement"
        var today = new Date()
        var datee =today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate()
        var heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        console.log(datee)
        console.log(heure)
        
        var cle = ajouterCle(props.process.categorie, props.process.nom_produit, props.numeroBox)
        await ConditService.ajouterConditionnement( props.process.categorie, props.process.nom_produit, etape, parseFloat(props.poids) ,parseFloat(props.nombre) , props.process.id_nettoyage, props.id_box, props.process.fk_proditfourni, cle)
        .then( (res)=> {
            console.log(res.data)
            setResult(res.data)

            serviceAlert.ajouterAlert(res.data.id_process, dateAlert()).then ((result) =>{
                alert (result.data)
            })
            
            serviceAlert.updateAlert(props.process.id_process).then ((result) =>{
                alert (result.data)
            })
        })
       
        props.confirmeConditionnemetTrue()
        handleShow3()
        props.handleClose()
        
        
        
    }

    return ( 
        <>
            <Modal show={props.show} onHide={props.handleClose}> 
                <Modal.Header closeButton>
                <Modal.Title>Voulez-vous valider ce process? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style = {{fontWeight: "bold"}} > ID box: </p> {props.id_box}
                    <p style = {{fontWeight: "bold"}} > Categorie: </p> {props.process.categorie}
                    <p style = {{fontWeight: "bold"}} > Type de produit: </p> {props.process.nom_produit}
                    <p style = {{fontWeight: "bold"}} > Agent: </p> {props.agent}
                    <p style = {{fontWeight: "bold"}} > Poids: </p> {props.poids}
                    <p style = {{fontWeight: "bold"}} > Nombre: </p> {props.nombre} 
                    <br/>
        
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose}>Non</button>
                        <button type="button" className="btn btn-success" onClick={(e)=>confirmNCondit(e)}>Oui</button>
                </Modal.Footer>
            </Modal>

            <ModalQStock 
                            show3={show3} 
                            handleClose3={handleClose3} 
                            handleShow3={handleShow3} 
                            result={result} 
                            toggleDisplay = {props.toggleDisplay} 
                            PorcentagePoids = {props.PorcentagePoids}
                            poids= {props.poids} nombre= {props.nombre} categorie={props.process.categorie}
                            />
        </>
     );
}
 
export default ModalConfirmCondit;

