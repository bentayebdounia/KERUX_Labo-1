import React ,{useState,useEffect} from 'react'
import ModalConfirmSortie from './ModalConfirmSortie'
import ModelReponse from '../../Models/Model.repense'
import ModalListAgent from '../../Models/modalListAgent'
import ServiceAdmin from '../../service/serviceAdmin'

const Sortie = (props) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [poids , setPoids] = useState(0)
    const [nombre , setNombre] = useState(0)
    const [agent , setAgent] = useState('')

    const [idAgent, setIdAgent]= useState([])

    

    const [message,setMessage] = useState()
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
        
        console.log(agent)
        
    }


    return ( 
        <div>
            <section id="etape_section">
                <div class="container">
                <div class="mb-3 row">
                    <label for="id_box"  class="col-sm-2 col-form-label label">ID Box</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="id_box" readOnly={props.readonly} defaultValue={props.id} required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="categorie"  class="col-sm-2 col-form-label">Categorie de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="categorie" readOnly={props.readonly} defaultValue={props.process.categorie} required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="typeprod" class="col-sm-2 col-form-label">Type de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="typeprod" readOnly={props.readonly} defaultValue={props.process.nom_produit} required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="recepteur"  class="col-sm-2 col-form-label">Agent de sortie</label>
                    <div class="col-sm-10">
                    <div class="input-group">
                        <input type="number" class="form-control" id="agentIdNettoyage" placeholder="" aria-label="Recipient's username with two button addons" value={agent} onChange={(e)=> setAgent(e.target.value)}/>
                        <button className="btn btn-dark btn-outline-dark" type="button" onClick={(e)=>ajouterAgent(e)} ><i className="bi bi-plus" style={{color: "white"}}></i></button>
                        <button className="btn btn-dark btn-outline-dark" type="button" ><i className="bi bi-person-lines-fill" style={{color: "white"}} onClick={handleShow2} ></i></button>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="poids" class="col-sm-2 col-form-label">Poids</label>
                    <div class="col-sm-10">
                    <input type="number"  class="form-control" id="poids" value={poids} onChange={(e)=> setPoids(e.target.value)} required/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="nombre" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                    <input type="number"  class="form-control" id="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} required/>
                    </div>
                </div>

                
                <div class="d-grid gap-3 d-md-flex justify-content-md-end" >
                    
                    <button class="btn2" type="submit" onClick={props.toggleDisplay}  >Annuler</button>
                    <button class="btn1" type="submit"onClick={handleShow} >Valider</button>
                
                </div>
            </div>
            {handleShow && <ModalConfirmSortie show2={show} handleClose2={handleClose} 
                                id_box={props.id}  
                                categorie={props.process.categorie}
                                typeProd={props.process.nom_produit}
                                agent={agent} 
                                poids={poids} 
                                nombre={nombre} 
                                id_enregistrement= {props.process.id_enregistrement} 
                                id_nettoyage= {props.process.id_nettoyage}
                                id_coupage= {props.process.id_coupage}
                                fk_proditfourni={props.process.fk_proditfourni}
                                test={props.test}
                                toggleDisplay = {props.toggleDisplay}
            />}

            {handleShow3 && <ModelReponse   show={show3} handleClose={handleClose3} 
                                            message={message} 
                                            titre={"sortie"} 
                                            />}

            {handleShow2 && <ModalListAgent     show={show2} 
                                                handleClose={handleClose2} 
                                                id={idAgent}
                                                nom={nomAgent}
                                                />}

            </section>
            
        </div>
     );
}
 
export default Sortie;