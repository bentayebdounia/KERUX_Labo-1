import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalMarinade from './marinad'
import ModalConfirmCondit from './ModalConfirmCondit'
import ModelReponse from '../../Models/Model.repense'
import ModalListAgent from '../../Models/modalListAgent'
import ServiceAdmin from '../../service/serviceAdmin'

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

    const [typeProd , setTypeProd] = useState('')
    const [poids , setPoids] = useState('')
    const [nombre , setNombre] = useState('')
    const [agent , setAgent] = useState('')
    const [idAgent, setIdAgent]= useState([])
    const [poidsControl, setPoidControl] = useState()
    const [note , setNote] = useState(false)

    
    var  bouttonMarinade

    const [confirmeConditionnement, setConfirmeConditionnemet] = useState(false)
    const confirmeConditionnemetTrue = () => setConfirmeConditionnemet(true)
    const confirmeConditionnemetFalse = () => setConfirmeConditionnemet(false)


    const [nomAgent, setNomAgent ] = useState([])

    const [message,setMessage] = useState()
    const [calculPoids, setCalculPoids] = useState([])
    const [PorcentagePoids, setPorcentagePoids] = useState()
    

    useEffect(()=>{
        if(confirmeConditionnement){
                setPorcentagePoids(ControlerPoids()); 
                setIdAgent([])
                setPoids('')
                setNombre('')
                confirmeConditionnemetFalse()
        }
    })

    function myFunction(total, value, index, array) {
        return total + value;
      }
    let porcentagePoids 

        const ControlerPoids = () => {
            console.log("nombreTotale= "+props.nombre)
            console.log(props.process.poids);
            console.log(poids);
            
            calculPoids.push(parseFloat (poids))
            console.log(calculPoids);
            let sum =calculPoids.reduce(myFunction)
            
            console.log("calcule poids= " +sum);
            porcentagePoids = sum*100/props.process.poids
            console.log("porcentage= "+ porcentagePoids);
            return porcentagePoids
        }

    const ajouterAgent=(e) => {
        e.preventDefault()
        ServiceAdmin.getPersonneById(agent)
        .then ( (res)=> {
            if(res.data==="ID n'existe pas"){
                console.log(res.data);
                setMessage("ID n'existe pas")
                handleShow3()
            
            }
  
            else{
                setNomAgent(current => [...current , res.data[0].nom +" "+ res.data[0].prenom])
                setIdAgent(current => [...current, agent]);
                console.log("ajouter agent "+ idAgent)
                setAgent('')
            }
        })
        
        console.log(agent)
        
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
        
                <button className="btn1" style={{background:"#000000"}} type="submit" onClick={handleShow2} >Marinade</button>
              
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


    return ( 
        <div>
            <section id="etape_section">
                <div className="container">
                <form class="needs-validation" noValidate>
                <div className="mb-3 row">
                
                    <label for="id_box"  className="col-sm-2 col-form-label">ID Box</label>
                    <div className="col-sm-10">
                        <input type="text"  className="form-control" id="id_box" readOnly={props.id} defaultValue={props.id}  required/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label for="categorie"  className="col-sm-2 col-form-label">Categorie de produit</label>
                    <div className="col-sm-10">
                        <input type="text"  className="form-control" id="categorie" readOnly={props.process.categorie} defaultValue={props.process.categorie} required/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label for="typeprod" className="col-sm-2 col-form-label">Type de produit</label>
                    <div className="col-sm-10">
                        <input type="text"  className="form-control" id="typeprod" readOnly={props.process.nom_produit} defaultValue={props.process.nom_produit} required/>
                    </div>
                </div>

                {bouton}
                

                <div className="mb-3 row">
                    <label for="recepteur"  className="col-sm-2 col-form-label">Agent de Conditionnemt</label>
                    <div className="col-sm-10">
                    <div className="input-group">
                        <input type="number" className="form-control" id="agentIdNettoyage" placeholder="" aria-label="Recipient's username with two button addons" value={agent} onChange={(e)=> setAgent(e.target.value)}/>
                        <button className="btn btn-dark btn-outline-dark" type="button" ><i className="bi bi-plus" style={{color: "white"}} onClick={(e)=>ajouterAgent(e)}></i></button>
                        <button className="btn btn-dark btn-outline-dark" type="button" ><i className="bi bi-person-lines-fill" style={{color: "white"}} onClick={handleShow4}></i></button>
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="poids" className="col-sm-2 col-form-label">Poids</label>
                    <div className="col-sm-10">
                    <input type="number"  className="form-control" id="poids" value={poids} onChange={(e)=> setPoids(e.target.value)} required/>
                    <label htmlFor="poids" className="col-sm-3 col-form-label">
                         <div className="progress"> Poids
                          
                            <div className="progress-bar " role="progressbar" aria-label="Example with label" style={{width: PorcentagePoids+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {PorcentagePoids} </div>
                        </div>
                    </label>
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
            {show2 && <ModalMarinade show2={show2} handleClose2={handleClose2} handleShow2={handleShow2} id_box={props.id}
             process={props.process}
              />}
            
             <ModalConfirmCondit    show={show} 
                                    handleClose={handleClose} 
                                    handleShow={handleShow}
                                    id_box={props.id}
                                    process={props.process}
                                    poids={poids}
                                    nombre={nombre}
                                    confirmeConditionnemetTrue= {confirmeConditionnemetTrue}  
                                    toggleDisplay = {props.toggleDisplay} 
                                    PorcentagePoids = {PorcentagePoids}
            />
            {show3 && <ModelReponse show={show3} handleClose={handleClose3} handleShow={handleShow3}
                                    message={message} 
                                    titre={"conditionnement"} 
                                    />}
            
            {show4 && <ModalListAgent             show={show4} 
                                        handleClose={handleClose4} 
                                        handleShow={handleShow4} 
                                        id={idAgent}
                                        nom={nomAgent}
                                        />}

            </section>
 
        </div>
     );
}
 
export default Conditionnement;