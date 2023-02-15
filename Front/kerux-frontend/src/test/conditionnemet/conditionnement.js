import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalMarinade from './marinad'
import ModalConfirmCondit from './ModalConfirmCondit'
import ModelReponse from '../../Models/Model.repense'
import ServiceAdmin from '../../service/serviceAdmin'
import Tableau from '../nettoyageProcess/tableau'
import '../nettoyageProcess/process.css'
import ModalAfficherMarinade from './afficherMarinade'
const Conditionnement = (props) => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

    const [showAffichgeMarinade, setShow_affichagemarinade] = useState(false)
    const handelCloseAffichageMarinade = () => setShow_affichagemarinade(false)
    const handelShowAffichageMarinade = () => setShow_affichagemarinade(true)


    const [typeProd , setTypeProd] = useState('')
    const [poids , setPoids] = useState('')
    const [nombre , setNombre] = useState('')
    const [agent , setAgent] = useState('')
    const [idAgent, setIdAgent]= useState([])
    const [poidsControl, setPoidControl] = useState()
    const [note , setNote] = useState(false)
    const [numeroBox, setNumerobox] = useState(1)
    const [unite, setUnite]= useState('kg')
    
    var  bouttonMarinade, agents

    const [confirmeConditionnement, setConfirmeConditionnemet] = useState(false)
    const confirmeConditionnemetTrue = () => setConfirmeConditionnemet(true)
    const confirmeConditionnemetFalse = () => setConfirmeConditionnemet(false)


    const [nomAgent, setNomAgent ] = useState([])

    const [message,setMessage] = useState()
    const [calculPoids, setCalculPoids] = useState([])
    const [PorcentagePoids, setPorcentagePoids] = useState()
    
    const [toggleRecomendation, setToggleRecomendation] = useState(true)
    const toggleRecomendationTrue = () => setToggleRecomendation (true)
    const toggleRecomendationFalse = () => setToggleRecomendation(false)

    const [id_personne, setIdpersonne] = useState()
    const [agentNettoyage, setAgentNettoyage] = useState([{
        id_personne:"",
        nom: "",
        prenom: ""
    }])
    const [agentNettoyageSelect, setAgentnettoyageselect] = useState([])
    const [listeAgentMarinade, setListe_agentMarinade] = useState([])
    const [marinade, setMarinade] = useState()
    const [micuissan, seMicuissan] = useState()
    const [affichage_marinade, setAffichage_marinade] = useState(false)
    let porcentagePoids 

    //get personnes
    useEffect(()=>{
        ServiceAdmin.getPersonneByNomOrPrenom(agent, agent)
        .then((res) => {
            setAgentNettoyage(res.data)
            console.log(agentNettoyage);
        })
    })

    useEffect(()=>{
        if(confirmeConditionnement){
                setPorcentagePoids(ControlerPoids()); 
                setIdAgent([])
                setNumerobox(numeroBox+1)
                setPoids('')
                if (props.process.categorie === 'poulet') setNombre('')
                else setNombre(0)
                confirmeConditionnemetFalse()
        }
    })

        function myFunction(total, value, index, array) {
            return total + value;
        }
    

        const ControlerPoids = () => {
            console.log("nombreTotale= "+props.nombre)
            console.log(props.process.poids);
            console.log(poids);
            
            calculPoids.push(parseFloat (transforme(unite, poids)))
            console.log(calculPoids);
            let sum =calculPoids.reduce(myFunction)
            
            console.log("calcule poids= " +sum);
            porcentagePoids = sum*100/props.process.poids
            console.log("porcentage= "+ porcentagePoids);
            return porcentagePoids
        }

        const ajouterAgent=(e) => {
            e.preventDefault()
          
            agentNettoyageSelect.push({
            id_personne: id_personne,
            nom:  agent,
            
           })
           handleShow4()
            setAgent('')
           
        }

        function transforme(unite, poids){
            console.log(unite);
            if (unite==="kg") {
                console.log(poids);
                return poids*1000
            }
            else if(unite==="gramme") return poids
        }

        function afficherMarinade (liste, marinade, micuissan) {
            setListe_agentMarinade(liste)
            setMarinade(marinade)
            seMicuissan(micuissan)
            setAffichage_marinade(true)
        } 

    const valider = (e) => {
        e.preventDefault()
        handleShow()
        
    }

    const annuler = () => {
        
        setIdAgent([])
        setPoids('')
        setNombre('')
       
    }
    

    var nbr, bouton , condit

    if(props.process.categorie==="poulet"){

        bouton = ( <>
            <div class="d-grid gap-3 mb-3 d-md-flex justify-content-md-end" >
        
               {affichage_marinade===false && <button className="btn1" style={{background:"#000000" }} type="submit" onClick={handleShow2} >Marinade</button>}
               {affichage_marinade===true && <button className="btn1" style={{background:"#000000", width:"250px"}} type="submit" onClick={handelShowAffichageMarinade} >Afficher marinade</button>}
            </div>
         </>
    )

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
        <div>
            <section id="etape_section">
                <div className="container">
                
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

                {bouton}
                <form class="needs-validation" noValidate>

                <div className="mb-3 row">
                    <label for="recepteur"  className="col-sm-2 col-form-label">Agent de Conditionnemt</label>
                    <div className="col-sm-10 dropdown">
                            <div className="input-group">
                                <input type="text" className="form-control" id="agentIdNettoyage" placeholder="" value={agent} onChange={(e)=> setAgent(e.target.value)} onClick={select}/>
                                <button className="btn" style={{background: '#7B170F' }} type="button" onClick={(e)=>ajouterAgent(e)} >
                                <i className="bi bi-plus" style={{color: "white" , fontSize:"15px"}}></i>
                                 </button>
                             </div>
                                    {agents}

                            </div>
                                    {show4 && <Tableau show={show4} 
                                        handleClose={handleClose4} 
                                        handleShow={handleShow4} 
                                        agentNettoyage={agentNettoyageSelect}
                                        
                                    />}
                </div>
                <div className="mb-3 row">
                    <label for="poids" className="col-sm-2 col-form-label">Poids</label>
                    <div className="col-sm-8">
                        <input type="number"  className="form-control" id="poids" value={poids} onChange={(e)=> setPoids(e.target.value)} required/>
                        
                        <label htmlFor="poids" className="col-sm-3 col-form-label">
                            <div className="progress"> Poids
                            
                                <div className="progress-bar " role="progressbar" aria-label="Example with label" style={{width: PorcentagePoids+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {PorcentagePoids} </div>
                            </div>
                        </label>
                    </div>
                    <div className="col-sm-2">
                                <select className="form-select" aria-label="Default select example" id="categorie"
                                    value={unite} 
                                    onChange={event => setUnite(event.target.value)}
                                    
                                    required>
                                
                                    <option value="kg">Kg</option>
                                    <option value="gramme">Gr</option>
                                </select>
                            </div>
                </div>
                <div className="mb-3 row">
                    {nbr}
                </div>

                
                <div class="d-grid gap-3 d-md-flex justify-content-md-end" >
                    
                    <button className="btn2" onClick={annuler} >Annuler</button>
                    <button className="btn1" type="submit" >Valider</button>
                
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

            {show2 && <ModalMarinade    show2={show2} 
                                        handleClose2={handleClose2} 
                                        handleShow2={handleShow2} 
                                        id_box={props.id}
                                        process={props.process}
                                        numeroBox= {numeroBox}
                                        afficherMarinade={afficherMarinade}
              />}

              {showAffichgeMarinade && <ModalAfficherMarinade   show={showAffichgeMarinade} 
                                                                handleClose = {handelCloseAffichageMarinade} 
                                                                handleShow = {handelShowAffichageMarinade} 
                                                                process={props.process}
                                                                marinade = {marinade}
                                                                micuissan = {micuissan}
                                                                agents = {listeAgentMarinade}
              />}
            
             <ModalConfirmCondit    show={show} 
                                    handleClose={handleClose} 
                                    handleShow={handleShow}
                                    id_box={props.id}
                                    process={props.process}
                                    poids={transforme(unite, poids)}
                                    nombre={nombre}
                                    confirmeConditionnemetTrue= {confirmeConditionnemetTrue}  
                                    toggleDisplay = {props.toggleDisplay} 
                                    PorcentagePoids = {PorcentagePoids}
                                    numeroBox= {numeroBox}
                                    agents={agentNettoyageSelect}
                                    btnC={props.conditBtn}
            />
            {show3 && <ModelReponse show={show3} handleClose={handleClose3} handleShow={handleShow3}
                                    message={message} 
                                    titre={"conditionnement"} 
                                    />}
            
            

            </section>
 
        </div>
     );
}
 
export default Conditionnement;