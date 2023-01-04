import React ,{useState,useEffect} from 'react'
import ModalListAgent from '../../Models/modalListAgent'
import ModalConfirmNet from './ModalConfirmNet'
import ModelReponse from '../../Models/Model.repense'
import ServiceAdmin from '../../service/serviceAdmin'
import './agentBarRecherch.css'
import Tableau from './tableau'
import './process.css'

const Nettoyage = (props) => {

    ///handel pour le modal de l'affichage de liste des agent 
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    /// handal pour la confirmation de process
    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)
    const [message,setMessage] = useState()

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)


    const [poids , setPoids] = useState()
    const [nombre , setNombre] = useState()
    const [agent , setAgent] = useState('')
    //const [datee, setDatee]= useState()
    //const [heure, setHeure]= useState()

    const [toggleRecomendation, setToggleRecomendation] = useState(true)
    const toggleRecomendationTrue = () => setToggleRecomendation (true)
    const toggleRecomendationFalse = () => setToggleRecomendation(false)

    var nbr, agents
    
    
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

    const ajouterAgent=(e) => {
        e.preventDefault()
      
        agentNettoyageSelect.push({
        id_personne: id_personne,
        nom:  agent,
        
       })
        handleShow()
        setAgent('')
            
        
        
        
    }

    
    const valider = (e) => {
        e.preventDefault()
        handleShow2()
    }

   
    if(props.process.categorie==="poulet"){
        nbr=(<>
                    <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                    <div className="col-sm-10">
                    <input type="number"  className="form-control" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} required/>
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
            <section id="etape_section">
                <div className="container">
                    <form class="needs-validation" noValidate>
                        <div className='row gy-2 gx-2'>
                            <div className="contenaireBox">
                                <label id="id_box"> ID Box: </label>
                                
                                <label  id="id_boxValue" >{props.id} </label>
                                
                            </div>

                                <div className="contenerProd col-6" >
                                    <label id="categorie"> Categorie de produit: </label>
                                    
                                    <label  id="categorieValue" >{props.process.categorie} </label>
                                    
                                </div>

                                <div className="contenerProd col-6" >
                                    <label id="produit"> Type de produit: </label>
                                    
                                    <label  id="produitValue" >{props.process.nom_produit} </label>
                                    
                                </div>
                            
                        
                        </div>
                        

                        <div className="mb-3 row">
                            <label htmlFor="recepteur"  className="col-sm-2 col-form-label">Agent de Nettoyage</label>
                            <div className="col-sm-10 dropdown">
                            <div className="input-group">
                                <input type="text" className="form-control" id="agentIdNettoyage" placeholder="" value={agent} onChange={(e)=> setAgent(e.target.value)} onClick={select}/>
                                <button className="btn" style={{background: '#7B170F' }} type="button" onClick={(e)=>ajouterAgent(e)} >
                                <i className="bi bi-plus" style={{color: "white" , fontSize:"15px"}}></i>
                                 </button>
                             </div>
                                    {agents}

                            </div>
                                    {show && <Tableau show={show} 
                                        handleClose={handleClose} 
                                        handleShow={handleShow} 
                                        agentNettoyage={agentNettoyageSelect}
                                        
                                    />}
                            
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="poids" className="col-sm-2 col-form-label">Poids</label>
                            <div className="col-sm-10">
                            <input type="number"  className="form-control" id="poids" value={poids} onChange={(e)=> setPoids(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            {nbr}
                        </div>

                        
                        <div className="d-grid gap-3 d-md-flex justify-content-md-end" >
                            
                            <button className="btn2" type="submit" onClick={()=>{props.toggleDisplay() ; props.nettoypBtn()} } > ANNULER </button>
                            <button className="btn1" type="submit" >VALIDER</button>
                        
                        </div>
                </form>

                {
                    (function () {
                            'use strict'
                        
                            // Fetch all the forms we want to apply custom Bootstrap validation styles to
                            var forms = document.querySelectorAll('.needs-validation')
                        
                            // Loop over them and prevent submission
                            Array.prototype.slice.call(forms)
                            .forEach(function (form) {
                                form.addEventListener('submit', function (event) {
                                if (!form.checkValidity()) {
                                    event.preventDefault()
                                    event.stopPropagation()

                                    
                                    
                                }
                                if (form.checkValidity()) valider(event)
                                
                        
                                form.classList.add('was-validated')
                                }, false)
                            })
                        })()
                }

            </div>
            
                            
             <ModalConfirmNet show2={show2} handleClose2={handleClose2} handleShow2={handleShow2}
                             id_enregistrement={props.id}  
                             categorie={props.process.categorie}  
                             typeProd={props.process.nom_produit}
                             agent={agent}  
                             poids={poids} 
                             nombre={nombre} 
                             fk_proditfourni={props.process.fk_proditfourni}
                             test={props.test}
                             toggleDisplay={props.toggleDisplay}
                             agents= {agentNettoyageSelect}
            />

            {show3 && <ModelReponse show={show3} handleClose={handleClose3} handleShow={handleShow3}
                                    message={message} 
                                    titre={"nettoyage"} 
                                    />}
            </section>
        </>
     );
}
 
export default Nettoyage;