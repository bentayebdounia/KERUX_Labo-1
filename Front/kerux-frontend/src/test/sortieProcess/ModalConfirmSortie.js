import React ,{useState,createRef} from 'react'
import Modal from 'react-bootstrap/Modal'
import TESTPRINT from '../../print/ModelPrint'
import serviceAlert from '../../service/service.alert'
import SortieService from '../../service/service.sorti'
import Service_AgentProcess from '../../service/service.agentProcess'
import { Bill } from '../coupage/bill'
import {useReactToPrint} from "react-to-print";

const ModalConfirmNet = (props) => {

    const [result, setResult] = useState()
    const [verificate, setVerificate] = useState(false)
    const functionTrue = () => setVerificate(true)
    var print

    const billRef = createRef();
 

    // Send print request to the Main process
    const handlePrint = function (target) {
        return new Promise(() => {
        console.log("forwarding print request to the main process...");

        const data = target.contentWindow.document.documentElement.outerHTML;
        //console.log(data);
        const blob = new Blob([data], {type: "text/html"});
        const url = URL.createObjectURL(blob);

        window.electronAPI.printComponent(url, (response) => {
            console.log("Main: ", response);
        });
        //console.log('Main: ', data);
        });
    };

    const handleBillPrint = useReactToPrint({
        content: () => billRef.current,
        documentTitle: "Bill component",
        print: handlePrint,
    });
    const confirmNettoyage = async (e) => {
        e.preventDefault();
        var etape="sortie"
        
        
    
        console.log(props.id_process);
        //********************ajouter sortie process*/
        await SortieService.ajouterSortie( props.categorie, props.typeProd, etape, props.poids, props.nombre, props.id_enregistrement , props.id_nettoyage , props.id_coupage, props.id_box , props.fk_proditfourni)
        .then( (res)=> {
            console.log(res.data)
            serviceAlert.updateAlert(props.id_process).then ((result) =>{
                //alert (result.data)
            })
            setResult(res.data)


            for(var i=0 ; i<props.agents.length ;i++) {
                console.log(props.agents[i].id_personne);
                Service_AgentProcess.ajouterAgentProcess(res.data.id_gnerate , props.agents[i].id_personne)
                .then((result)=>{
                    console.log(result.data)
                            })
            }    
            print = (   <div style={{display:"none"}}>
                            <Bill   ref={billRef}
                                    id={res.data}
                                    categorie = {props.categorie}
                                 />
                        </div>)
            functionTrue()
           
            
            
        })
        if (verificate){
                        handleBillPrint()
                        props.sortieBtn()
                        props.toggleDisplay()
                        props.handleClose2()
            }
      
    }

    
    
    

    return ( 
        <div>
           
            <Modal show={props.show2} onHide={props.handleClose2}> 
                <Modal.Header closeButton>
                <Modal.Title>Voulez-vous valider ce process? </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="list-group">
                    <span  className="list-group-item ">  <span className='attributs'>ID boxe:</span>  {props.id_box} </span>
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
                        {print}
                            
                                       
                
                    
                        
                    
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