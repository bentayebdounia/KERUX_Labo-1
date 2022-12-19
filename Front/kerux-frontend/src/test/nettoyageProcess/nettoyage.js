import React ,{useState,useEffect} from 'react'
import ModalListAgent from '../../Models/modalListAgent'
import ModalConfirmNet from './ModalConfirmNet'
import ModelReponse from '../../Models/Model.repense'
import ServiceAdmin from '../../service/serviceAdmin'



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
    
    const [idAgent, setIdAgent]= useState([])
    const [nomAgent, setNomAgent ] = useState([])

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
        
        
        
    }

    
    const valider = (e) => {
        e.preventDefault()
        handleShow2()
    }

    const [poids , setPoids] = useState()
    const [nombre , setNombre] = useState()
    const [agent , setAgent] = useState('')
    //const [datee, setDatee]= useState()
    //const [heure, setHeure]= useState()

    var nbr
    if(props.process.categorie==="poulet"){
        nbr=(<>
                    <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                    <div className="col-sm-10">
                    <input type="number"  className="form-control" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} required/>
                    </div>
            </>
                   
        )
    }

    return ( 
        <>
            <section id="etape_section">
                <div className="container">
                    <form class="needs-validation" novalidate>
                        <div className="mb-3 row">
                            <label htmlFor="id_box"  className="col-sm-2 col-form-label">ID Box</label>
                            <div className="col-sm-10">
                                <input type="text"  className="form-control" id="id_box" readOnly={props.id} defaultValue={props.id}  required/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="categorie"  className="col-sm-2 col-form-label">Categorie de produit</label>
                            <div className="col-sm-10">
                                <input type="text"  className="form-control" id="categorie" readOnly={props.process.categorie} defaultValue={props.process.categorie}  required/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="typeprod" className="col-sm-2 col-form-label">Type de produit</label>
                            <div className="col-sm-10">
                                <input type="text"  className="form-control" id="typeprod" readOnly={props.process.nom_produit} defaultValue={props.process.nom_produit}  required/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="recepteur"  className="col-sm-2 col-form-label">Agent de Nettoyage</label>
                            <div className="col-sm-10">
                            <div className="input-group">
                                <input type="number" className="form-control" id="agentIdNettoyage" placeholder="" value={agent} onChange={(e)=> setAgent(e.target.value)}/>
                                <button className="btn btn-dark btn-outline-dark" type="button" onClick={(e)=>ajouterAgent(e)}>
                                    <i className="bi bi-plus" style={{color: "white"}}> </i>
                                </button>
                                <button className="btn btn-dark btn-outline-dark" type="button" onClick={handleShow}>
                                    <i className="bi bi-person-lines-fill" style={{color: "white"}}> </i>
                                </button>
                                </div>
                            </div>
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
                            
                            <button className="btn2" type="submit" onClick={props.toggleDisplay}  >Annuler</button>
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
            {show && <ModalListAgent show={show} 
                            handleClose={handleClose} 
                            handleShow={handleShow} 
                            id={idAgent}
                            nom={nomAgent}
                            />}
                            
            {show2 && <ModalConfirmNet show2={show2} handleClose2={handleClose2} handleShow2={handleShow2}
                             id_enregistrement={props.id}  
                             categorie={props.process.categorie}  
                             typeProd={props.process.nom_produit}
                             agent={agent}  
                             poids={poids} 
                             nombre={nombre} 
                             fk_proditfourni={props.process.fk_proditfourni}
                             test={props.test}
                             toggleDisplay={props.toggleDisplay}
                             agents= {idAgent}
            />
}
            {show3 && <ModelReponse show={show3} handleClose={handleClose3} handleShow={handleShow3}
                                    message={message} 
                                    titre={"nettoyage"} 
                                    />}
            </section>
        </>
     );
}
 
export default Nettoyage;