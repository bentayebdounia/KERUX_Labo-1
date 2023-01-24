import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import CoupageService from '../../service/service.coupage'
import ModalQStock from './Stock_coupage/Modal.ajouterEnStock'
import Service_AgentProcess from '../../service/service.agentProcess'
import serviceAlert from '../../service/service.alert'

const ModalConfirmCoup = (props) => {
    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [resulte, setResult] = useState()

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
        if (props.categorie === "poulet" ){
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+7)
        }

        else if (props.categorie === "legume" ){
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+3)
        }
    }

    const confirmCoupage = async (e) => {
        e.preventDefault();
        var etape="coupage"
        var today = new Date()
        var datee =today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate()
        var heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        console.log(datee)
        console.log(heure)

        var cle = ajouterCle(props.categorie, props.typeProd, props.numeroBox)
        console.log(  props.fk_proditfourni)
        
        await CoupageService.ajouterCoupage( props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id_box, props.fk_proditfourni, cle).then( (res)=> {
            console.log(res.data)
            setResult(res.data)

            serviceAlert.ajouterAlert(res.data.id_process, dateAlert()).then ((result) =>{
                alert (result.data)
            })

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
                    <span style = {{fontWeight: "bold"}} > ID box: </span> {props.id_box}
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
                                result={resulte} 
                                toggleDisplay = {props.toggleDisplay}
                                PorcentagePoids = { props.PorcentagePoids}
                                poids= {props.poids} nombre= {props.nombre} categorie={props.categorie}
                                />
        </>
     );
}
 
export default ModalConfirmCoup;