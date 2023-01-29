import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import TESTPRINT from '../../print/ModelPrint';
import serviceAlert from '../../service/service.alert';
import SortieService from '../../service/service.sorti'
const ModalConfirmNet = (props) => {

    const [result, setResult] = useState()
    const [verificate, setVerificate] = useState(false)
    const functionTrue = () => setVerificate(true)
    

    const confirmNettoyage = async (e) => {
        e.preventDefault();
        var etape="sortie"
        
        console.log(props.id_process);
        //categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni

        //const nettoyage = {props.id_box, props.categorie, props.typeProd, props.poids, props.nombrs }      nom_produit, etape, poids, nombre, id_enregistrement, fk_proditFourni
        await SortieService.ajouterSortie( props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id_enregistrement , props.id_nettoyage , props.id_coupage, props.id_box , props.fk_proditfourni).then( (res)=> {
            console.log(res.data)
            serviceAlert.updateAlert(props.id_process).then ((result) =>{
                alert (result.data)
            })
            setResult(res.data)
            functionTrue()
            
        })

        //window.print()
        props.toggleDisplay()
        props.handleClose2()
            
      
    }

    
    
    

    return ( 
        <div>
           
            <Modal show={props.show2} onHide={props.handleClose2}> 
                <Modal.Header closeButton>
                <Modal.Title>Voulez-vous valider ce process? </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p style = {{fontWeight: "bold"}} > ID box: </p> {props.id_box}
                    <p style = {{fontWeight: "bold"}} > Categorie: </p> {props.categorie}
                    <p style = {{fontWeight: "bold"}} > Type de produit: </p> {props.typeProd}
                    <p style = {{fontWeight: "bold"}} > Agent: </p> {props.agent}
                    <p style = {{fontWeight: "bold"}} > Poids: </p> {props.poids}
                    <p style = {{fontWeight: "bold"}} > Nombre: </p> {props.nombre} 

                    
                    
                        
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose2}>Non</button>
                        <button type="button" className="btn btn-success" onClick={(e)=>confirmNettoyage(e)}>Oui</button>
                </Modal.Footer>
            </Modal>

            {(verificate===true) &&
                    <div className='display-print' style={{display:"none" , margin: '0px'}}>
                            <TESTPRINT id= {result} poids= {props.poids} nombre= {props.nombre} categorie={props.categorie} />
                    </div>
                }
            
        </div>
     );
}
 
export default ModalConfirmNet;