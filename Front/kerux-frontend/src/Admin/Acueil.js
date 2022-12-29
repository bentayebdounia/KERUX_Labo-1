import React ,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../bootstrap-icons-1.9.1/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation } from "react-router-dom";

import './acueil.css'
import ServiceAdmin from '../service/serviceAdmin'
import ServiceRole from '../service/service.role'

import AjouterFournisseur from './fournisseur/ajouterfournisseur'
import ListFournisseur from './fournisseur/listeFournisseur';
import AjouterProduit from './produit/ajouterProduit'
import List from './produit/listeProduit'

const Acueil = (props) => {
    const [controleAjout, setControleAjout] = useState(false)
    const [controleModif, setControleModif] = useState(false)
    const [controleList, setControleList] = useState(false)
    const [controlePassword, setControlePassword] = useState(false)

    const [nom , setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [date_naissance, setDateN] = useState('')
    const [adresse, setAdr] = useState('')
    const [num_tel, setTel] = useState('')
    const [role, setRole] = useState('')
    const [mot_passe, setPassword] = useState('')
    const [recherche, setRecherche] = useState('')


    const [personnes , setPersonnes] = useState([])  //table des personne 
    const [personnesmodif , setPersonnesmodif] = useState([])


    //teste d'affichage coponenets
    let agent, modifyAgent, listAgent,  ajouterFournisseur, ajouterProduit, ListProduit


    const [fk_role, setFk_role] = useState()

   
    
  

    const location = useLocation();
    
    const [nomUser, setNomUser] = useState() 
    const [prenomUser, setPrenomUser]  = useState()
    const [idUser, setIdUser]  = useState()

    const [toggleAjoutFourni , setToggleAjoutfourni ]  = useState (false)
    const toggleshowAjoutFourni = () => setToggleAjoutfourni(true)
    const toggleDisplayAjoutFourni = () => setToggleAjoutfourni (false)
    const [togglelistFourni , setTogglelistfourni ]  = useState (false)
    const toggleshowListFourni = () => setTogglelistfourni(true)
    const toggleDisplayListFourni = () => setTogglelistfourni (false)

    const [toggleAjoutProduit , setToggle_ajoutproduit ]  = useState (false)
    const toggleshowAjoutProduit = () => setToggle_ajoutproduit(true)
    const toggleDisplayAjoutProduit = () => setToggle_ajoutproduit (false)

    const [toggleListProduit , setToggle_listproduit ]  = useState (false)
    const toggleshowListProduit = () => setToggle_listproduit(true)
    const toggleDisplayListProduit = () => setToggle_listproduit (false)

  

    useEffect(()=>{
      setNomUser  (location.name)
      setPrenomUser  (location.lastname)
      setIdUser (location.id)
    })
    

    //console.log(location.state.prenom);

/********************** ajouer un agent  *****************************************/
    //ajouter au BDD
    

    const saveAgent = (e) => {
      e.preventDefault();
        console.log(date_naissance);
        const agent = { nom, prenom, date_naissance, num_tel, adresse,  fk_role };
        
        console.log(role)
        ServiceRole.getIdRole(role).then( (res)=> {
            console.log(res.data.id_role) 
            
            setFk_role(JSON.parse(res.data.id_role))
        }).then( () => {
            console.log('agent =>' + JSON.stringify(agent));
            ServiceAdmin.ajouterAgent(agent).then((res)=>{
                console.log(res.data)
                if(res.data==='Agent bien ajouter'){
                  setNom('')
                  setPrenom('')
                  setDateN('')
                  setAdr('')
                  setTel('')
                  setFk_role('')




                  
                }
             })}

        )
        
    }

    const getAllPersonne = () => {
        ServiceAdmin.getPersonne().then((res) => {
            setPersonnes(res.data)
            console.log(res.data)
        })
    }
    function getElement(){
        if (role ==='') getAllPersonne()

        else if (role === "id"){
            console.log(recherche)
            ServiceAdmin.getPersonneById(recherche).then( (res) => {
            setPersonnes(res.data)
            })
        }
        else if (role === "nom"){
            ServiceAdmin.getPersonneByNom(recherche).then( (res) => {
                setPersonnes(res.data)
                })
        }
        else if (role === "prenom"){
            ServiceAdmin.getPersonneByPrenom(recherche).then( (res) => {
                setPersonnes(res.data)
                })
        }
        
        
    }


    //masquer ou afficher la section d'ajout
    const ajouter=() => {
        setControleAjout(true)
        setControleModif(false)
        setControleList(false)
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()      
    }
    const modifier =  () => {
        setControleAjout(false)
        setControleModif(true)
        setControleList(false)
        setPersonnes([])
        setRecherche('')
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit() 
        

        
    }
    const liste =  () => {
        setControleAjout(false)
        setControleModif(false)
        setControleList(true)
        getAllPersonne()
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()

        
    }

    const fournisseurAjout= () => {
      setControleAjout(false)
        setControleModif(false)
        setControleList(false)
        toggleshowAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()
    }
    const fournisseurModify= () => {
      setControleAjout(false)
        setControleModif(false)
        setControleList(false)
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()
    }
    const fournisseurList= () => {
      setControleAjout(false)
        setControleModif(false)
        setControleList(false)
        toggleDisplayAjoutFourni()
        toggleshowListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()
    }

    

    const produitAjout= () => {
          setControleAjout(false)
          setControleModif(false)
          setControleList(false)
          toggleshowAjoutFourni()
          toggleDisplayListFourni()
          toggleshowAjoutProduit() 
          toggleDisplayListProduit()

    }

    const produitList= () => {
      setControleAjout(false)
      setControleModif(false)
      setControleList(false)
      toggleDisplayAjoutFourni()
      toggleDisplayListFourni()
      toggleDisplayAjoutProduit() 
      toggleshowListProduit()
      
}

/*************************** ajouter agent  ************************************************/
    if(controleAjout ){
       
        agent = (
          <div>
          <h1 id="titre" >Ajouter un agent</h1>
          
          <section className="section" id="ajouterAgent">
              <form className="needs-validation" name="formModify" noValidate>
                    <div className="mb-3 row">
                        <label for="nomAgent"  className="col-sm-2 col-form-label ">Nom</label>
                        <div className="col-sm-10">
                        <input  type="text"  className="form-control" id="nomAgent" value={nom} onChange={(e)=> setNom(e.target.value)} required/>
                        </div>
                        
                    </div>

                    <div className="mb-3 row">
                        <label for="prenomAgent" className="col-sm-2 col-form-label " >Prénom</label>
                        <div className="col-sm-10">
                        <input type="text"  className="form-control" id="prenomAgent" value={prenom} onChange={(e)=> setPrenom(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label for="DNagent" className="col-sm-2 col-form-label ">Date de naissance</label>
                        <div className="col-sm-10">
                        <input type="date"  className="form-control label" id="DNagent" value={date_naissance} onChange={(e)=> setDateN(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label for="adresseAgent" className="col-sm-2 col-form-label ">Adresse</label>
                        <div className="col-sm-10">
                        <input type="text"  className="form-control" id="adresseAgent" value={adresse} onChange={(e)=> setAdr(e.target.value)} required/>
                        </div>
                    </div>
                    

                    <div className="mb-3 row">
                        <label for="numAgent" className="col-sm-2 col-form-label ">N° téléphone</label>
                        <div className="col-sm-10">
                        <input type="number"  className="form-control" id="numAgent" value={num_tel} onChange={(e)=> setTel(e.target.value)} required/>
                        </div>
                    </div>
                    
                    <div className="mb-3 row">
                        <label for="roleAgentAjout" className="col-sm-2 col-form-label">Role</label>
                        <div className="col-sm-10">
                            <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={role} onChange={(e)=> setRole(e.target.value)}  required>
                                <option selected></option>
                                <option value="Admin">Admin</option>
                                <option value="Agent de saisie">Agent de saisie</option>
                                <option value="Agent simple">Agent simple</option>
                            </select>
                        </div>
                    </div>
                  
                  
                    {role!="Agent simple" && <div className="mb-3 row" >
                          <label for="inputPassword" className="col-sm-2 col-form-label">Mot de passe</label>
                          <div className="col-sm-10">
                          <input type="password" className="form-control" id="password" value={mot_passe} onChange={(e)=> setPassword(e.target.value)} required/>
                          </div>
                      </div>}
                      <div className="d-grid gap-2 my-4">
                        <button className="btn1" type="submit" id="ajouterbtn" >AJOUTER</button>
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
                            if (form.checkValidity()) saveAgent(event)
                    
                            form.classList.add('was-validated')
                          }, false)
                        })
                    })()
              }

          </section>

      </div>
        )
       
    }

/*************************** modifier agent  ************************************************/
   


  if (controleModif){
        modifyAgent = (
                <div>
                    <h1 id="titre" >Modifier un agent</h1>
                    <section className="section" id="modifierAgent">
            <div className="mb-3 row agent">
              
                <select className="form-select" aria-label="Default select example" id="roleAgent" value={role} onChange={(e)=> setRole(e.target.value)}>
                  <option value="id" selected >ID</option>
                  <option value="nom">Nom</option>
                  <option value="prenom">Prénom</option>
                  </select>
              
                <div className="input-group col-sm-9">
                  <input type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2"  value={recherche} onChange={(e)=> setRecherche(e.target.value)}/>
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>getElement(e)} >
                    <i className="bi bi-search" style={{fontSize: "1.25rem"}}></i>
                  </button>
                </div>
              
              <div className="divTab">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Prénom</th>
                      <th scope="col">Date de naissance</th>
                      <th scope="col">Adresse</th>
                      <th scope="col">N° téléphone</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        personnes.map(
                            (personne, key) =>
                                <tr key={key}>
                                    <td>{personne.id_personne}</td>
                                    <td>{personne.nom}</td>
                                    <td>{personne.prenom}</td>
                                    <td>{personne.date_naissance}</td>
                                    <td>{personne.adresse}</td>
                                    <td>{personne.num_tel}</td>
                                    <td>{personne.fk_role}</td>
                                 </tr>
                        )
                    }
                    
                  </tbody>
                </table>
              </div>
              
              <form className="row gy-4 gx-2 align-items-left form">
                
                  <div className="form-floating col-4 ">
                    <input type="text" className="form-control" id="nom" />
                    <label for="nom">Nom</label>
                  </div>
                  <div className="form-floating col-4 ">
                    <input type="text" className="form-control" id="prenom" />
                    <label for="prenom">Prénom</label>
                  </div>
                  <div className="form-floating col-4 ">
                    <input type="date" className="form-control" id="dateN" />
                    <label for="dateN">Date naissance</label>
                  </div>
                  <div className="form-floating col-4 ">
                    <input type="text" className="form-control" id="adr"/>
                    <label for="adr">Adresse</label>
                  </div>
                  <div className="form-floating col-4 ">
                    <input type="number" className="form-control" id="tel" />
                    <label for="tel">N° téléphone</label>
                  </div>
                  <div className="form-floating col-4 forma">
                    <select className="form-select" aria-label="Default select example" id="roleAgent" required>
                      <option selected></option>
                      <option value="1">Admin</option>
                      <option value="2">Agent de saisie</option>
                      <option value="3">Agent simple</option>
                    </select>
                    <label for="roleAgent">Role</label>
                  </div>
                  <div className="form-floating col-8" >
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Mot de passe"/>
                    <label for="floatingPassword">Mot de passe</label>
                  </div>
                  <div>
                  <div className="d-grid gap-2 my-4">
                    <button className="btnModify" type="submit" >MODIFIER</button>
                  </div>
                  </div>
              </form>
            </div>

            
          </section>
        </div>
        )
    }


/*************************** Liste des agent  ************************************************/
    

if (controleList){
    listAgent = (
            <div>
                <h1 id="titre" >Liste des agent</h1>
                <div>
                <section className="section" id="modifierAgent">
        <div className="mb-3 row agent">
          
            <select className="form-select" aria-label="Default select example" id="roleAgent" value={role} onChange={(e)=> setRole(e.target.value)}>
              <option selected></option>
              <option value="id">ID</option>
              <option value="nom">Nom</option>
              <option value="prenom">Prénom</option>
              </select>
          
            <div className="input-group col-sm-9">
              <input type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2" value={recherche} onChange={(e)=> setRecherche(e.target.value)} />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>getElement(e)}>
                <i className="bi bi-search" style={{fontSize: "1.25rem"}}></i>
              </button>
            </div>
          
          <div className="divTab">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Date de naissance</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">N° téléphone</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {
                    personnes.map(
                        (personne, key) =>
                            <tr key={key}>
                                <td>{personne.id_personne}</td>
                                <td>{personne.nom}</td>
                                <td>{personne.prenom}</td>
                                <td>{personne.date_naissance}</td>
                                <td>{personne.adresse}</td>
                                <td>{personne.num_tel}</td>
                                <td>{personne.fk_role}</td>
                                
                                
                        

                             </tr>
                    )
                }
                
              </tbody>
            </table>
          </div>

          

        </div>
      </section>
      </div>
    </div>
    )
}
  

if(toggleAjoutFourni){
  ajouterFournisseur=(<AjouterFournisseur display={toggleDisplayAjoutFourni} /> )
}
if(togglelistFourni){
  ajouterFournisseur=(<ListFournisseur display={toggleDisplayListFourni} /> )
}

if(toggleAjoutProduit){
  ajouterFournisseur=(<AjouterProduit display={toggleDisplayAjoutProduit} /> )
}
if(toggleListProduit){
  ListProduit=(<List display={toggleDisplayListProduit} /> )
}
    
/*************************** sidbar ****************************************************************/

let fournisseur , agents , produit
const [toggleAgentBar, setToggleagentbar] = useState(false)
const AffichAgentBar = () => setToggleagentbar(!toggleAgentBar)


const [toggleFournisseurBar, setTogglefournisseurbar] = useState(false)
const AffichFournisseurBar = () => setTogglefournisseurbar(!toggleFournisseurBar)

const [toggleProduitBar, setToggleproduitbar] = useState(false)
const AffichProduitBar = () => setToggleproduitbar(!toggleProduitBar)



if (toggleAgentBar) {
                agents= (
                  <>
                      <ol>
                      <Link to={'#'} className="nav-link active" aria-current="page"  onClick={ajouter}>Ajouter un agent</Link>
                      </ol>
                      <ol>
                      <Link to={'#'} className="nav-link" onClick={modifier}  >Modifier un agent</Link>
                      </ol>
                      <ol>
                      <Link to={'#'} className="nav-link" onClick={liste} >Liste des agents</Link>
                      </ol>
                    </>
)}



if(toggleFournisseurBar){
          fournisseur = (
            <>
              <ol>
              <Link to={'#'} className="nav-link" onClick={fournisseurAjout} >Ajouter fournisseur</Link>
              </ol>
    
              <ol>
              <Link to={'#'} className="nav-link" onClick={fournisseurList} >Liste des fournisseurs</Link>
              </ol>
            </>
        )

}

if(toggleProduitBar){
  produit = (
    <>
      <ol>
      <Link to={'#'} className="nav-link" onClick={produitAjout}  >Ajouter produit</Link>
      </ol>
      
      <ol>
      <Link to={'#'} className="nav-link" onClick={produitList} >Liste des produits</Link>
      </ol>
    </>
)

}




    let sidebar = 
        (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 py-5 bg-light d-none d-md-block sidebar">
                    <div className="left-sidebar">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                 <Link to={'#'}  className="nav-link active" aria-current="page" style={{color: "unset" , fontWeight:"bold" , fontSize:"22px"}}
                                                   onClick={AffichAgentBar}
                                                   >Agent</Link>
                                 {agents}
                            </li>
                            
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link" style={{color: "unset" , fontWeight:"bold" , fontSize:"22px"}} onClick={AffichFournisseurBar} >Fournisseur</Link>
                                {fournisseur}
                            </li>

                            <li className="nav-item">
                                <Link to={'#'} className="nav-link" style={{color: "unset" , fontWeight:"bold" , fontSize:"22px"}} onClick={AffichProduitBar} >Produit</Link>
                                {produit}
                            </li>
                        </ul>
                    </div>
                </div>
    
            </div>
        </div>
        )
    

    return(
        <div>
            <nav className="navbar  fixed-top flex-md-nowrap p-0 shadow" style={{background: "#7B170F"}}>
                
                    <Link className="nav-link active me-auto mx-3" link="#" aria-current="page" style={{color:"white", fontSize: "13px"}}
                                   to={{pathname:"/test", state:{nom: nomUser , prenom: prenomUser , id: idUser}}} >
                                    Mode agent</Link>
                    <Link className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-fill" style={{color: "white", fontSize: "1.25rem" }}></i>
                        <i className="bi bi-chevron-down" style={{fontSize:" 0.5rem", color:"white"}}></i>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <span className="spanUser">MAHMOUDI Amine</span> 
                            <br/>
                            <span className="spanID">4</span> 
                            <br/>
                            <span className="spanRole">admin</span> 
                        </li>
                        <li><Link to='login' className="dropdown-item" >Déconnecter</Link></li>
                    </ul>
                
            </nav>
            {sidebar}
            <main role="main" className="col-md-10 ml-sm-auto col-lg-10">
                <div className="containerMain">
                    {agent}
                    {modifyAgent}
                    {listAgent}
                    {ajouterFournisseur}
                    {ListProduit}
                    
                </div>
            </main>
            
          
            
        </div>

        

    
    )

}
export default Acueil