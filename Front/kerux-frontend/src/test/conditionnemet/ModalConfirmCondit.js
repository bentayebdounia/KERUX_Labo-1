import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import ConditService from '../../service/service.condit'
import ModalQStock from '../coupage/Stock_coupage/Modal.ajouterEnStock'
const ModalConfirmCondit = (props) => {

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [result, setResult] = useState()
    const confirmNCondit = (e) => {
        e.preventDefault();
        var etape="conditionnement"
        var today = new Date()
        var datee =today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate()
        var heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        console.log(datee)
        console.log(heure)
        //categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni

        //const nettoyage = {props.id_box, props.categorie, props.typeProd, props.poids, props.nombrs }      nom_produit, etape, poids, nombre, id_enregistrement, fk_proditFourni
        ConditService.ajouterConditionnement( props.process.categorie, props.process.nom_produit, etape, parseFloat(props.poids) ,parseFloat(props.nombre) , props.process.id_nettoyage, props.id_box, props.process.fk_proditfourni)
        .then( (res)=> {
            console.log(res.data)
            setResult(res.data)
            
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
                            />
        </>
     );
}
 
export default ModalConfirmCondit;