import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import MarinadeService from '../../service/service.marinade'
import ModelReponse from '../../Models/Model.repense'
import ModalListAgent from '../../Models/modalListAgent'
import ServiceAdmin from '../../service/serviceAdmin'
import Tableau from '../nettoyageProcess/tableau';
import '../nettoyageProcess/process.css'
import Service_AgentProcess from '../../service/service.agentProcess'

const ModalMarinade = (props) => {
    const [idAgent, setIdAgent]= useState([])
    const [agent , setAgent] = useState('')

    const [marine, setMarine]= useState(false)
    const [miCuissan, setMiCuissan]= useState(false)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const [toggleRecomendation, setToggleRecomendation] = useState(true)
    const toggleRecomendationTrue = () => setToggleRecomendation (true)
    const toggleRecomendationFalse = () => setToggleRecomendation(false)
    var mi_cuissan, agents
    const [id_personne, setIdpersonne] = useState()
    const [agentNettoyage, setAgentNettoyage] = useState([{
        id_personne:"",
        nom: "",
        prenom: ""
    }])
    const [agentNettoyageSelect, setAgentnettoyageselect] = useState([])
    //get personnes
    useEffect(()=>{
        ServiceAdmin.getPersonneByNomOrPrenom(agent, agent)
        .then((res) => {
            setAgentNettoyage(res.data)
            console.log(agentNettoyage);
        })
    })


    const handleChange = (data) => {
        if(data === 'marine'){
            
                setMarine(!marine)
                console.log(marine);    
                console.log('marine '+marine)
            
        }
    }
    const handleChange2 = (data) => {
        if(data === 'mi-cuissan'){
            
                setMiCuissan(!miCuissan)
                console.log(miCuissan);
                //console.log('mi-cuissan '+miCuissan);
            
            
        }
    }



    const confirmMarinade = (e) => {
        e.preventDefault();
        var etape="marinade"

        //var cle = ajouterCle(props.process.categorie, props.typeProd, props.numeroBox)
        
        //categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni

        //categorie, nom_produit, etape, poids, nombre, marine, mi_cuissan, id_nettoyage, id_coupage, fk_proditFourni
        MarinadeService.ajouterMarinade( props.process.categorie, props.process.nom_produit, etape, props.process.poids, props.process.nombre, marine, miCuissan, props.process.id_nettoyage, props.id_box, props.process.fk_proditfourni)
        .then( (res)=> {
            console.log(res.data)
            for(var i=0 ; i<agentNettoyageSelect.length ;i++) {
                console.log(agentNettoyageSelect[i].id_personne);
                Service_AgentProcess.ajouterAgentProcess(res.data.id_gnerate , agentNettoyageSelect[i].id_personne)
                .then((result)=>{
                    console.log(result.data)
                            })
            } 
        
        }) 

        
        
        props.afficherMarinade(agentNettoyageSelect, marine, miCuissan)
        props.handleClose2()
    }

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [message,setMessage] = useState()
    
    const [nomAgent, setNomAgent ] = useState([])

    const ajouterAgent=(e) => {
        e.preventDefault()
      
        agentNettoyageSelect.push({
        id_personne: id_personne,
        nom:  agent,
        
       })
       handleShow2()
        setAgent('') 
        
        
    }
      

        if(props.process.nom_produit !== 'tendres'){
            mi_cuissan = (
                <>
                    <div>
                        <Form.Check aria-label="option 1" label="Mi-cuissan" value={miCuissan} onChange= {()=> handleChange2('mi-cuissan')}/>
                    </div>
                </>
            )
        }

        function select () {
        
            toggleRecomendationFalse()
           
        }

        agents= (
            <>
                <div className='dataResults'>
                             {agentNettoyage.map((value, key) => {
                                         return (
                                             <a className='dataItems'  onClick={()=>{setAgent(value.nom+ " " + value.prenom); setIdpersonne(value.id_personne) }}>
                                                 <p > {value.id_personne} . {value.nom} {value.prenom} </p>
                                             </a>
                                         )
                                     })}
                         </div>
            </>
        )
    
    return ( 
        <>
            <Modal size='lg' show={props.show2} onHide={props.handleClose2}> 
                <Modal.Header closeButton>
                <Modal.Title>Marinade </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                        <div className="contenerProd " >
                            <label id="produit"> Type de produit: </label>
                            
                            <label  id="produitValue" > {props.process.nom_produit} </label>
                            
                        </div>
                            
                        <div className="mb-3 row">
                            <label htmlFor="recepteur"  className="col-sm-4 col-form-label">Agent de marinade</label>
                            <div className="col-sm-7 dropdown">
                                <div className="input-group">
                                    <input type="text" className="form-control " id="agentIdNettoyage" placeholder="" value={agent} onChange={(e)=> setAgent(e.target.value)} onClick={select}/>
                                    <button className="btn" style={{background: '#7B170F' }} type="button" onClick={(e)=>ajouterAgent(e)} >
                                        <i className="bi bi-plus" style={{color: "white" , fontSize:"15px"}}></i>
                                    </button>
                                </div>
                                        {agents}

                                </div>
                                        {show2 && <Tableau  show={show2} 
                                                            handleClose={handleClose2} 
                                                            handleShow={handleShow2} 
                                                            agentNettoyage={agentNettoyageSelect}
                                                    />}
                        </div>
                        <div>
                            <Form.Check aria-label="option 1" label="Marinade" value={marine} onChange= {()=> handleChange('marine')} />
                            {mi_cuissan}
                        </div>
                    
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.handleClose2}>Annuler</button>
                        <button type="button" className="btn btn-success" onClick={(e)=>confirmMarinade(e)}>Valider</button>
                </Modal.Footer>
            </Modal>

            <ModelReponse   show={show3} 
                            handleClose={handleClose3} 
                            handleShow={handleShow3}
                            message={message} 
                            titre={"marinade"} 
                                    />

            

           
        </>
     )
}
 
export default ModalMarinade;