import React ,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../bootstrap-icons-1.9.1/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './process.css'
import '../service/service.process'
import ServiceProcess from '../service/service.process'
/*
const Process = () => {
    const [controleReception, setControleReception] = useState(false)
    const [controleEnrg, setControleEnrg] = useState(false)
    const [controleNettoyage, setControleNettoyage] = useState(false)
    const [controleCoupage, setControleCoupage] = useState(false)
    const [controleCondit, setControleCondit] = useState(false)
    const [controleSortie, setControleSortie] = useState(false)
    const [controleTest, setControleTest] = useState(false)



    let reception, enregistrement, nettoyage, coupage, conditionnement, sortie, test
    //************************ navbar ***************************************************
    let navbar = (
        <div>
          <nav className="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
            <div className="container-fluid" id='divContainer'>
          
          <Link className="nav-link active me-auto mx-3" style={{color: "white" , fontSize: "13px" }} aria-current="page" to="#">
            <i className="bi bi-house-door-fill" style={{fontSize: "1rem" ,color:"white"}}></i>
            Acueil
          </Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  aria-current="page" to="#">Process</Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  aria-current="page" to="#">
            <i className="bi bi-journals" style={{fontSize: "1rem", color:"white"}}></i>
            Journal
          </Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  aria-current="page" href="#">Stock</Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  aria-current="page" href="#">Inventair</Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  aria-current="page" href="#">Statistique</Link>
        
          <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-fill" style={{fontSize: "1.25rem", color:"white"}}></i>
            <i className="bi bi-chevron-down" style={{fontSize: "0.5rem", color:"white"}}></i>
          </Link>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span className="spanUser">Nom d'utilisateur</span> 
              <br/>
              <span className="spanID">ID</span> 
              <br/>
              <span className="spanRole">Role</span> 
           </li>
            <li><Link class="dropdown-item" to='login'>Déconnecter</Link></li>
          </ul>
          
            </div>
        </nav>
        </div>
    )
//********************************* step coponant ***************************/
  /*  let stepComponant= (
        <div>
            <div className="container" id='stepComponant'>
        <div className="row row-cols-6">
            <div className="etape"  type="submit" onClick={recepBtn}>
                <div className="bi bi-1-circle" style={{fontSize: "4rem", color: "#D3D3D3"}}  id="etape1"></div>
                <div id="reception_etape" >Reception</div> 
            </div>
            <div className="etape">
                <i className="bi bi-2-circle" style={{fontSize: "4rem", color: "#D3D3D3"}}></i>
                <div id="enreg_etape">Enregistrement</div> 
            </div>

            <div className="etape" type="submit"  onClick={nettoypBtn}>
                <i className="bi bi-3-circle" style={{fontSize: "4rem", color: "#D3D3D3"}}></i>
                <div id="nettoyage_etape">Nettoyege</div> 
            </div>

            <div className="etape" type="submit" onClick={coupBtn}>
                <i className="bi bi-4-circle" style={{fontSize: "4rem", color: "#D3D3D3"}}></i>
                <div id="coupage_etape">Coupage</div> 
            </div>

            <div className="etape" type="submit" >
                <i className="bi bi-5-circle" style={{fontSize: "4rem", color: "#D3D3D3"}}></i>
                <div id="cond_etape">Conditionnemet</div> 
            </div>

            <div className="etape" type="submit" onClick={sortieBtn}>
                <i className="bi bi-6-circle" style={{fontSize: "4rem", color: "#D3D3D3"}}></i>
                <div id="sortie_etape" >Sortie</div> 
            </div>
        </div>
    
    </div>

        </div>
    )


//*********************************** Etape *************************************************************/
 // boutons etapes
 /*       function recepBtn(){
            setControleReception(true)
            setControleEnrg(false)
            setControleNettoyage(false)
            setControleCoupage(false)
            setControleCondit(false)
            setControleSortie(false)
            setControleTest(false)
        }
        function testBtn(){
            setControleReception(false)
            setControleEnrg(false)
            setControleNettoyage(false)
            setControleCoupage(false)
            setControleCondit(false)
            setControleSortie(false)
            setControleTest(true)
        }

        function enrgBtn(){
            setControleReception(false)
            setControleEnrg(true)
            setControleNettoyage(false)
            setControleCoupage(false)
            setControleCondit(false)
            setControleSortie(false)
            setControleTest(false)
        }
        function nettoypBtn(){
            setControleReception(false)
            setControleEnrg(false)
            setControleNettoyage(true)
            setControleCoupage(false)
            setControleCondit(false)
            setControleSortie(false)
            setControleTest(false)
        }
        function coupBtn(){
            setControleReception(false)
            setControleEnrg(false)
            setControleNettoyage(false)
            setControleCoupage(true)
            setControleCondit(false)
            setControleSortie(false)
            setControleTest(false)
        }
        function conditBtn(){
            setControleReception(false)
            setControleEnrg(false)
            setControleNettoyage(false)
            setControleCoupage(false)
            setControleCondit(true)
            setControleSortie(false)
            setControleTest(false)
        }
        function sortieBtn(){
            setControleReception(false)
            setControleEnrg(false)
            setControleNettoyage(false)
            setControleCoupage(false)
            setControleCondit(false)
            setControleSortie(true)
            setControleTest(false)
        }

       

//**************************** reception *******************************************
const [nom_fournisseur, setFournisseur] = useState('')
const [acheteur, setAcheteur] = useState('')
const [type_bon, setTypebon] = useState('')
const [recepteur, setRecepteur] = useState('')
const [bonScanner, setBonScanner] = useState('')
const [datee, setDatee]= useState()
const [heure, setHeure]= useState()
var today = new Date()


const confirmReception = (e) => {
    setDatee(today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate())
    setHeure(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
  
    console.log(datee)
    console.log(heure)

    const bon = { nom_fournisseur, acheteur, type_bon, datee, heure};
        e.preventDefault();
        
       ServiceProcess.ajouterBon(bon).then( (res)=> {
            console.log(res.data)
            alert(res.data)
         })

}
if(controleReception){
    reception=(
        <div className="containerMain">
            <section id="etape_section">
            <div class="container">
                <div>
                    <div class="mb-3 row">
                        <label for="fournisseur"  class="col-sm-2 col-form-label" >Fournisseur</label>
                        <div class="col-sm-10">
                        <input type="text"  class="form-control" id="fournisseur" value={nom_fournisseur} onChange={(e)=> setFournisseur(e.target.value)} required/>
                        </div>
                    </div>
                </div>
                
    
                <div class="mb-3 row">
                    <label for="acheteur"  class="col-sm-2 col-form-label" >Acheteur</label>
                    <div class="col-sm-10">
                      <input type="text"  class="form-control" id="acheteur" value={acheteur} onChange={(e)=> setAcheteur(e.target.value)} required/>
                    </div>
                </div>
    
                <div class="mb-3 row">
                    <label for="typeBon" class="col-sm-2 col-form-label">Type de bon</label>
                    <div class="col-sm-10">
                      <select class="form-select" aria-label="Default select example" id="typeBon" value={type_bon} onChange={(e)=> setTypebon(e.target.value)}  required>
                        <option selected></option>
                        <option value="bon de livraison">Bon de livraison</option>
                        <option value="bon d'achat">Bon d'achat</option>
                      </select>
                  </div>
                </div>
    
                <div class="mb-3 row">
                    <label for="recepteur"  class="col-sm-2 col-form-label">Récepteur</label>
                    <div class="col-sm-10">
                      <input type="text"  class="form-control" id="recepteur" value={recepteur} onChange={(e)=> setRecepteur(e.target.value)} required/>
                    </div>
                </div>
    
                <div class="input-group">
                    <input type="file" class="form-control" id="inputfile" aria-describedby="inputGroupFileAddon04" aria-label="Upload" value={bonScanner} onChange={(e)=> setBonScanner(e.target.value)}/>
                </div>
    
                <div class="d-grid gap-2 my-4">
                    <button class="btn1" type="submit" onClick={(e) => confirmReception(e)} >Valider</button>
                </div>
    
            </div>
        </section>
        </div>
    )}

    //**************************** Test process by id product *******************************************
if(controleTest){
    test= (
        <div>
            <section id="etape_section">
                <div class="container">
                    <div class="mb-3 row">
                    <label for="id_etape"  class="col-sm-2 col-form-label label">ID Box</label>
                    <div class="col-sm-10">
                        <div class="input-group col-sm-10">
                        <input type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button class="btn btn-dark btn-outline-dark" type="button" id="button-addon2" onclick="idValider()"><i class="bi bi-check-lg" style={{color: "white"}}></i></button>
                        </div>
                    </div>
                </div>

                </div>

            </section>
        </div>
    )
}

    //**************************** nettoyage *******************************************

const [id_box , setId_box] = useState('')
const [categorie_n , setCategorie_n] = useState('')
const [typeProd , setTypeProd] = useState('')
const [poids , setPoids] = useState('')
const [nombre , setNombre] = useState('')
const [agent , setAgent] = useState('')

const confirmNettoyage = (e) => {
    setDatee(today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate())
    setHeure(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
  
    console.log(datee)
    console.log(heure)

    
}

if(controleNettoyage){
    nettoyage= (
        <div>
            <section id="etape_section">
                <div class="container">
                <div class="mb-3 row">
                    <label for="id_box"  class="col-sm-2 col-form-label">ID Box</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="id_box" value={id_box} onChange={(e)=> setId_box(e.target.value)} required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="categorie"  class="col-sm-2 col-form-label">Categorie de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="categorie" value={categorie_n} onChange={(e)=> setCategorie_n(e.target.value)} required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="typeprod" class="col-sm-2 col-form-label">Type de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="typeprod" value={typeProd} onChange={(e)=> setTypeProd(e.target.value)} required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="recepteur"  class="col-sm-2 col-form-label">Agent de Nettoyage</label>
                    <div class="col-sm-10">
                    <div class="input-group">
                        <input type="number" class="form-control" id="agentIdNettoyage" placeholder="" aria-label="Recipient's username with two button addons" value={agent} onChange={(e)=> setAgent(e.target.value)}/>
                        <button class="btn btn-dark btn-outline-dark" type="button" onclick="ajouterAgent(document.getElementById('agentIdNettoyage').value)"><i class="bi bi-plus" style={{color: "white"}}></i></button>
                        <button class="btn btn-dark btn-outline-dark" type="button" onclick="listeAgent()"><i class="bi bi-person-lines-fill" style={{color: "white"}}></i></button>
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
                    
                    <button class="btn2" type="submit"  >Annuler</button>
                    <button class="btn1" type="submit" onClick={(e) => confirmNettoyage(e)} >Valider</button>
                
                </div>
            </div>

            </section>
        </div>
    )
}

//**************************** coupage *******************************************
if(controleCoupage){
    coupage= (
        <div>
            <section id="etape_section">
                <div class="container">
                <div class="mb-3 row">
                    <label for="id_box"  class="col-sm-2 col-form-label">ID Box</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="id_box" required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="categorie"  class="col-sm-2 col-form-label">Categorie de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="categorie" required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="typeprod" class="col-sm-2 col-form-label">Type de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="typeprod" required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="recepteur"  class="col-sm-2 col-form-label">Agent de Coupage</label>
                    <div class="col-sm-10">
                    <div class="input-group">
                        <input type="number" class="form-control" id="agentIdNettoyage" placeholder="" aria-label="Recipient's username with two button addons"/>
                        <button class="btn btn-dark btn-outline-dark" type="button" onclick="ajouterAgent(document.getElementById('agentIdNettoyage').value)"><i class="bi bi-plus" style={{color: "white"}}></i></button>
                        <button class="btn btn-dark btn-outline-dark" type="button" onclick="listeAgent()"><i class="bi bi-person-lines-fill" style={{color: "white"}}></i></button>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="poids" class="col-sm-2 col-form-label">Poids</label>
                    <div class="col-sm-10">
                    <input type="number"  class="form-control" id="poids" required/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="nombre" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                    <input type="number"  class="form-control" id="nombre" required/>
                    </div>
                </div>

                
                <div class="d-grid gap-3 d-md-flex justify-content-md-end" >
                    
                    <button class="btn2" type="submit"  >Annuler</button>
                    <button class="btn1" type="submit" >Valider</button>
                
                </div>
            </div>

            </section>
        </div>
    )
}

//**************************** sortie *******************************************
if(controleSortie){
    sortie= (
        <div>
            <section id="etape_section">
                <div class="container">
                <div class="mb-3 row">
                    <label for="id_box"  class="col-sm-2 col-form-label label">ID Box</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="id_box" required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="categorie"  class="col-sm-2 col-form-label">Categorie de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="categorie" required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="typeprod" class="col-sm-2 col-form-label">Type de produit</label>
                    <div class="col-sm-10">
                        <input type="text"  class="form-control" id="typeprod" required/>
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="recepteur"  class="col-sm-2 col-form-label">Agent de sortie</label>
                    <div class="col-sm-10">
                    <div class="input-group">
                        <input type="number" class="form-control" id="agentIdNettoyage" placeholder="" aria-label="Recipient's username with two button addons"/>
                        <button class="btn btn-dark btn-outline-dark" type="button" onclick="ajouterAgent(document.getElementById('agentIdNettoyage').value)"><i class="bi bi-plus" style={{color: "white"}}></i></button>
                        <button class="btn btn-dark btn-outline-dark" type="button" onclick="listeAgent()"><i class="bi bi-person-lines-fill" style={{color: "white"}}></i></button>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="poids" class="col-sm-2 col-form-label">Poids</label>
                    <div class="col-sm-10">
                    <input type="number"  class="form-control" id="poids" required/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="nombre" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                    <input type="number"  class="form-control" id="nombre" required/>
                    </div>
                </div>

                
                <div class="d-grid gap-3 d-md-flex justify-content-md-end" >
                    
                    <button class="btn2" type="submit"  >Annuler</button>
                    <button class="btn1" type="submit" >Valider</button>
                
                </div>
            </div>

            </section>
        </div>
    )
}

 
    return ( 
        <div>
            {navbar}
            {stepComponant}
            <main role="main" id='mainprocess' class="col-md-10 ml-sm-auto col-lg-10">
                
                    {reception}
                    {test}
                    {nettoyage}
                    {coupage}
                    {sortie}
                  
                
            </main>
            

        </div>
     );
}
 
export default Process;

*/