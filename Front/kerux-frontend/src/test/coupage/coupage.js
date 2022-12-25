import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalConfirmCoup from './ModalConfirmCoup'
import ModelReponse from '../../Models/Model.repense'
import ModalListAgent from '../../Models/modalListAgent'
import ServiceAdmin from '../../service/serviceAdmin'

const Coupage = (props) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [confirmeCoupage, setConfirmeCoupage] = useState(false)
    const confirmeCoupageTrue = () => setConfirmeCoupage(true)
    const confirmeCoupageFalse = () => setConfirmeCoupage(false)

    const [message,setMessage] = useState()

    const [typeProd , setTypeProd] = useState(props.process.nom_produit)
    const [poids , setPoids] = useState()
    const [nombre , setNombre] = useState()
    const [agent , setAgent] = useState('')
    const [idAgent, setIdAgent]= useState([])
    
    //const [note , setNote] = useState(false)
    const [nomAgent, setNomAgent ] = useState([])

    const [PorcentagePoids, setPorcentagePoids] = useState()
    const [PorcentageWings, setPorcentageWings] = useState()
    const [PorcentageLegs, setPorcentageLegs] = useState()
    const [PorcentageTenders, setPorcentageTenders] = useState()

    const [calculPoids, setCalculPoids] = useState([])
    const [calculNombreWings, setCalculNombreWings] = useState([])
    const [calculNombreTenders, setCalculNombreTenders] = useState([])
    const [calculNombreLegs, setCalculNombreLegs] = useState([])
    
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

   
    
    useEffect(()=>{
        if(confirmeCoupage){
                setPorcentagePoids(ControlerPoids()); 
                setPorcentageWings(ControleNombreW());
                setPorcentageLegs(ControleNombreL());
                setPorcentageTenders(ControleNombreT());

                confirmeCoupageFalse()
        }
    })

    function myFunction(total, value, index, array) {
        return total + value;
      }
    let porcentagePoids , porcentageWings, porcentageLegs, porcentageTenders

        const ControlerPoids = () => {
            console.log("nombreTotale= "+props.nombre)
            console.log(props.poids);
            console.log(poids);
            
            calculPoids.push(parseFloat (poids))
            console.log(calculPoids);
            let sum =calculPoids.reduce(myFunction)
            
            console.log("calcule poids= " +sum);
            porcentagePoids = sum*100/props.poids
            console.log("porcentage= "+ porcentagePoids);
            return porcentagePoids
        }


        
        const ControleNombreW = () => {
            if (props.process.categorie==="poulet") {
                if (typeProd==="wings"){
                    calculNombreWings.push(parseFloat(nombre))
                    let sum = calculNombreWings.reduce(myFunction)
                    porcentageWings = sum*100/(props.nombre*2)
                    console.log("porcentage Wings= " +porcentageWings);
                    return porcentageWings
                }
                
            }
        }

        const ControleNombreL = () => {
            if (props.process.categorie==="poulet") {
                if (typeProd==="legs"){
                    calculNombreLegs.push(parseFloat(nombre))
                    let sum = calculNombreLegs.reduce(myFunction)
                    porcentageLegs = sum*100/(props.nombre*2)
                    console.log("porcentage Legs= " +porcentageLegs);
                    return porcentageLegs
                }
            }
        }

        const ControleNombreT = () => {
            if (props.process.categorie==="poulet") {
                if (typeProd==="tendres"){
                    calculNombreTenders.push(parseFloat(nombre))
                    let sum = calculNombreTenders.reduce(myFunction)
                    porcentageTenders = sum*100/(props.nombre*2)
                    console.log("porcentage Tenders= " +porcentageTenders);
                    return porcentageTenders
                }
            }


        }

        const valider = (e) => {
            e.preventDefault()
            handleShow()
        }

        const annuler = () => {
            setTypeProd('')
            setIdAgent([])
            setPoids('')
            setNombre('')
           
        }

    

    var nbr, TypePoulet, TypeLegume
    if(props.process.categorie === "poulet"){
        TypePoulet=(
            <>
                    <select className="form-select" aria-label="Default select example" id="typeprod" value={typeProd} onChange={(e)=> setTypeProd(e.target.value)}  required>
                        <option defaultValue ={""}></option>
                        <option value = "tendres" > Tendres</option>
                        <option value = "wings" >Wings</option>
                        <option value = "legs" >Legs</option>
                        <option value =" dips" >Dips</option>
                        <option value = "hotDogs" >HotDogs</option>
                    </select>
                        
            </>
        )
        nbr=(
                <>
                    <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                    <div className="col-sm-10">
                    <input type="number"  className="form-control" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} required/>
                    <label htmlFor="poids" className="col-sm-3 col-form-label">
                    
                         <div className="progress mb-2 "> Wings
                            <div className="progress-bar " role="progressbar" aria-label="Example with label" style={{width: PorcentageWings+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {PorcentageWings} </div>
                            
                        </div>
                        <div className="progress mb-2"> Legs 
                            <div className="progress-bar " role="progressbar" aria-label="Example with label" style={{width: PorcentageLegs+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {PorcentageLegs} </div>
                             </div>
                        <div className="progress"> Tenders
                            <div className="progress-bar " role="progressbar" aria-label="Example with label" style={{width: PorcentageTenders+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {PorcentageTenders} </div>
                        </div>

                         </label>
                    </div>
                </>
                   
        )
    }

    if(props.process.categorie==="legume"){
       
        TypeLegume=(
            <>
                      <input type="text"  className="form-control" id="id_box" readOnly={typeProd} defaultValue={typeProd}  required/>
                        
            </>
        )}

    return ( 

        <div>
            <section id="etape_section">
                <div className="container">
                    <form class="needs-validation" noValidate>
                        <div className="mb-3 row">
                            <label for="id_box"  className="col-sm-2 col-form-label">ID Box</label>
                            <div className="col-sm-10">
                                <input type="text"  className="form-control" id="id_box" readOnly={props.id} defaultValue={props.id} required/>
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
                                {TypePoulet}
                                {TypeLegume}
                            
                        </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="recepteur"  className="col-sm-2 col-form-label">Agent de Coupage</label>
                            <div className="col-sm-10">
                            <div className="input-group">
                                <input type="number" className="form-control" id="agentIdNettoyage" placeholder="" value={agent} onChange={(e)=> setAgent(e.target.value)}/>
                                <button className="btn btn-dark btn-outline-dark" type="button" onClick={(e)=>ajouterAgent(e)}>
                                    <i className="bi bi-plus" style={{color: "white"}}> </i>
                                </button>
                                <button className="btn btn-dark btn-outline-dark" type="button" onClick={handleShow2} >
                                    <i className="bi bi-person-lines-fill" style={{color: "white"}}> </i>
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="poids" className="col-sm-2 col-form-label">Poids</label>
                            <div className="col-sm-10">
                            <input type="number"  className="form-control" id="poids" value={poids} onChange={(e)=> {setPoids(e.target.value);}} required/>
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

                        
                        <div className="d-grid gap-3 d-md-flex justify-content-md-end" >
                            
                            <button className="btn2" type="submit" onClick={annuler} >Annuler</button>
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
            <ModalConfirmCoup   
                                show2={show} 
                                handleClose2={handleClose} 
                                handleShow2={handleShow}
                                id_box={props.id}  
                                categorie={props.process.categorie}  
                                typeProd={typeProd}
                                agents={idAgent}  
                                poids={poids} 
                                nombre={nombre} 
                                fk_proditfourni={props.process.fk_proditfourni}   
                                confirmeCoupageTrue= {confirmeCoupageTrue}  
                                toggleDisplay = {props.toggleDisplay} 
                                PorcentagePoids = {PorcentagePoids}

                 />

            {show3 && <ModelReponse 
                                    show={show3} 
                                    handleClose={handleClose3} 
                                    handleShow={handleShow3}
                                    message={message} 
                                    titre={"coupage"} 
                                    />}

            {show2 && <ModalListAgent             show={show2} 
                                        handleClose={handleClose2} 
                                        handleShow={handleShow2} 
                                        id={idAgent}
                                        nom={nomAgent}
                                        />}
            </section>
           

      
        </div>
     );
}
 
export default Coupage;