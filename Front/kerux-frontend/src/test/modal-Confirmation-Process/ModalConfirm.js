import React ,{useState,useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import NettoyageService from '../../service/service.nettoyage'
import ModalQStock from '../Stock/Modal.ajouterEnStock'
import Service_AgentProcess from '../../service/service.agentProcess'
import serviceAlert from '../../service/service.alert'
import './modalConfirm.css'
//import Print from './print';
const ModalConfirmNet = (props) => {

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)


    
 
    const [result, setResult] = useState()
    //console.log("agent[]= " +props.agents[2]);
    //console.log("length = "+props.agents.length); 
    const [id, setId] = useState('') 
    var idGne
    useEffect(()=>{
        setId(idGne)
    },idGne)

    const dateAlert = () => {
        const d = new Date
        /*
        if (props.categorie === "poulet" ){
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+7)
        }

        else if (props.categorie === "legume" ){
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+3)
        }*/
        return d
    }
    const confirmNettoyage = async (e) => {
        e.preventDefault();
        var etape="nettoyage"
       
        await NettoyageService.ajouterNettoyage( props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id , props.fk_proditfourni )
        .then( (res)=> {
            console.log(res.data)
            setResult(res.data)
            idGne = res.data.id_gnerate
            //console.log("id_gnerate= " + result.id_gnerate);
            //idd=res.data.id_gnerate
            
            serviceAlert.ajouterAlert(res.data.id_process, dateAlert()).then ((result) =>{
               // alert (result.data)
            })

            serviceAlert.updateAlert(props.id_process).then ((result) =>{
                
                //alert (result.data.id_alert)
            })
            //console.log(idd);
            //ajouter les agents  de nettoyage au bdd
            for(var i=0 ; i<props.agents.length ;i++) {
                console.log(props.agents[i].id_personne);
                Service_AgentProcess.ajouterAgentProcess(res.data.id_gnerate , props.agents[i].id_personne)
                .then((result)=>{
                    console.log(result.data)
                            })
            }                 
                
        })
        
        handleShow3()
        props.nettoypBtn()
       props.handleClose2()  
    }

    
    //console.log(props.agents);


    
    return ( 
        <>
            <Modal size="l"  show={props.show2} onHide={props.handleClose2}> 
                <Modal.Header closeButton>
                <Modal.Title>Voulez-vous valider ce process? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="list-group">
                    <span  className="list-group-item ">  <span className='attributs'>ID boxe:</span>  {props.id} </span>
                    <span  className="list-group-item  list-group-item-light"> <span className='attributs'>Categorie:</span> {props.categorie}</span>
                    <span className="list-group-item  list-group-item-light"> <span className='attributs'>Type de produit:</span> {props.typeProd} </span>
                    <span className="list-group-item  list-group-item-light"> <span className='attributs'>Agent:</span> 
                        
                            {props.agents.map((value, key) => {
                                                return (
                                                    
                                                <li > {value.id_personne} . {value.nom} {value.prenom} </li>
                                                    
                                                )
                                            })}
                        
                    </span>
                    <span className="list-group-item list-group-item-action list-group-item-light"> <span className='attributs'>Poids:</span> {props.poids /1000} Kg</span>
                    {props.categorie ==='poulet' && <span className="list-group-item list-group-item-action list-group-item-light"> <span className='attributs'>Nombre:</span> {props.nombre }</span>}
                    
                </div>

                    
                   
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose2}>Non</button>
                        <button type="button" className="btn btn-success" onClick={ (e)=> confirmNettoyage(e) }>Oui</button>
                </Modal.Footer>    
            </Modal>

            <ModalQStock    
                            show3={show3} 
                            handleClose3={handleClose3} 
                            handleShow3={handleShow3} 
                            result={result} 
                            toggleDisplay={props.toggleDisplay} 
                            poids= {props.poids} nombre= {props.nombre}
                             categorie={props.categorie}
                        />
            
            
        </>
     );
}
 
export default ModalConfirmNet;


