import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import CoupageService from '../../service/service.coupage'
import ModalQStock from './Stock_coupage/Modal.ajouterEnStock'
import Service_AgentProcess from '../../service/service.agentProcess'
const ModalConfirmCoup = (props) => {
    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [result, setResult] = useState()

  

    const confirmCoupage = async (e) => {
        e.preventDefault();
        var etape="coupage"
        var today = new Date()
        var datee =today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate()
        var heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        console.log(datee)
        console.log(heure)
        
        await CoupageService.ajouterCoupage( props.categorie, props.typeProd, etape, props.poids, props.nombre,props.id_box, props.fk_proditfourni).then( (res)=> {
            console.log(res.data)
            setResult(res.data)

            //ajouter les agents  de nettoyage au bdd
            for(var i=0 ; i<props.agents.length ;i++) {
                console.log(props.agents[i]);
                Service_AgentProcess.ajouterAgentProcess(res.data.id_gnerate , props.agents[i])
                .then((result)=>{
                    console.log(result.data)
                            })
            } 
        
        })
       
        
        props.handleClose2()
        props.confirmeCoupageTrue()
        handleShow3()
        
        
        
        
    }

    return ( 
        <>
            <Modal show={props.show2} onHide={props.handleClose2}> 
                <Modal.Header closeButton>
                <Modal.Title>Voulez-vous valider ce process? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span style = {{fontWeight: "bold"}} > D box: </span> {props.id_box}
                    <br/>  
                    <span style = {{fontWeight: "bold"}} > Categorie: </span> {props.categorie}
                    <br/>
                    <span style = {{fontWeight: "bold"}} > Type de produit: </span> {props.typeProd}
                    <br/>
                    <span style = {{fontWeight: "bold"}} > Agent de coupage:: </span> {props.agent}
                    <br/>
                    <span style = {{fontWeight: "bold"}} > Poids: </span> {props.poids}
                    <br/>
                    <span style = {{fontWeight: "bold"}} > Nombre: </span> {props.nombre} 
                   
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose2}>Non</button>
                        <button type="button" className="btn btn-success" onClick={(e)=>confirmCoupage(e)}>Oui</button>
                </Modal.Footer>
                
            </Modal>

            <ModalQStock 
                                show3={show3} 
                                handleClose3={handleClose3} 
                                handleShow3={handleShow3}  
                                result={result} 
                                toggleDisplay = {props.toggleDisplay}
                                PorcentagePoids = { props.PorcentagePoids}
                                />
        </>
     );
}
 
export default ModalConfirmCoup;