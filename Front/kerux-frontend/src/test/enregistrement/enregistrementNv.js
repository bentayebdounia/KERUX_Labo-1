import React ,{useState,useEffect} from 'react'
//import EnregitrementService from '../../service'
import ModelReponse from '../../Models/Model.repense'
import ProduitFourni from './produitFourni'
import ModalAjoutBoxes from './ModalAjouterBoxes'
import EnregistrementService from '../../service/service.enregistrement'
import './enreg.css'
import AffichageBoxes from './boxAffichage'
import Recape from './recape'

const Enregistrement = (props) => {

   // const [test, setTest] = useState(false)
    
    

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showAffichage, setShowaffichage] = useState(false)
    const handleCloseAffichage = () => setShowaffichage(false)
    const handleShowAffichage = () => setShowaffichage(true)

    const [showRecap, setShowRecap] = useState(false)
    const handleCloseRecap = () => setShowRecap(false)
    const handleShowRecap = () => setShowRecap(true)

    
    const [idprod, setIdprod] = useState(1)
    
    const[produitsFourni, setProduitsFourni] = useState([])
    const [categorie, setCategorie] = useState()
    const [nom_produit, setNom_produit] = useState()
    const [poids_fourni, setPoids_fourni] = useState()
    const [nombre_fourni, setNombre_fourni] = useState()
    const [unite, setUnite] = useState()
    var nbr, TypePoulet, TypeLegume
    
    const [poids, setPoids] = useState(0)
    const [produitFourni, setProduitForuni] = useState({
            categorie: "",
            nom_produit: "", 
            id_produit: "",
            poids_fourni:0,
            nombre_fourni:0
    })
    
    const [conteur, setConteur] = useState (0)

    const [erreurCategorie, setErreurcategorie] = useState(false)
    const [erreurProduit, setErreurproduit] = useState(false)
    const [erreurPoids, setErreurpoids] = useState(false)
    const [erreurNombre, setErreurnombre] = useState(false)

   //les variable imegrer
   const [produit_id, setProduit_id ]= useState() 
   const [produit_type, setProduit_type] = useState()
   const [produit_poids, setProduit_poids] = useState()
   const [produit_nombe, setProduit_nombre] = useState()
   const [produit_categorie, setProduit_categorie] = useState()

   const [poidsRester, setPoidsrester] = useState()

   const [length, setLength] = useState()

    function plus () {

        setConteur(conteur+1)
        //const newProduits = [...produits]

        // EnregistrementService.ajouterProduitFournit(produits[0].categorie, produits[0].nom_produit, transforme(produits[0].unite , produits[0].poids), produits[0].nombre, props.id_bon)
        // .then((res) => {
            
        //     setProduitForuni(res.data[0])

        // })

        console.log(conteur);
        var prod= {
            id_prod: idprod,
            categorie : categorie, 
            nom_produit:nom_produit, 
            poids_fourni:transforme(unite , poids_fourni), 
            nombre_fourni: parseInt (nombre_fourni), 
            id_bon:props.id_bon,
            poidsRester: 0

        }
        produitsFourni.push(prod)
        localStorage.setItem ('produitsFournis', JSON.stringify(produitsFourni))

        setIdprod(idprod+1)
        console.log(produitFourni);
        setProduitForuni(prod)
       // handleShow()
                            
        
        
    
    }

    function transforme(unite, poids){
        console.log(unite);
        if (unite==="kg") {
            console.log(poids);
            return poids*1000
        }
        else return poids
    }

    function verificationPoids(poids, nombre , unite){
        
        console.log(poids*1000/nombre)
        return transforme(unite, poids)/nombre

    }

    const  ajouterProduitFourni = () => {

        if (categorie !== '' && nom_produit!== '' && (poids_fourni !== '' && poids_fourni !== '0' && poids_fourni !== 0) && unite !=='' ){
            if (categorie === 'poulet' ){
                if(nombre_fourni !== '' && nombre_fourni !== '0' && nombre_fourni !== 0){
                    console.log(poids_fourni);
                    if(verificationPoids( poids_fourni, nombre_fourni, unite)>=1500 && verificationPoids(poids_fourni, nombre_fourni, unite)<=2500)
                        plus()
                    else alert ('le nombre est incorrect' )
                }
                else setErreurnombre(true)
            } 
            else plus()

        }
        else {
            setErreurcategorie(true)
            setErreurproduit(true)
            setErreurpoids(true)
        }
       
        
       // console.log("box=  "+produits[0].product);
        
    }
    
 
      const confirmer = (e) => {
        console.log(poids);
        props.toggleDisplay()
      }

      

      const ajouterBox = (id, categorie, type, poids, nombre) => {
        setProduit_id(id)
        setProduit_type(type)
        setProduit_categorie(categorie)
        setProduit_poids(poids)
        setProduit_nombre(nombre)
      }

      const poidsRestant = (poidsGlobal) => {
            setPoidsrester(poidsGlobal)

            return poidsRester
      }

      const AfiicherBoxes = (id) => {
        setProduit_id(id) 
        handleShowAffichage()
      }

      if(categorie === "poulet"){
        TypePoulet=(
            <>
                        <option defaultValue ={""}></option>
                        <option value ={"poulet"}>poulet</option>
                        <option value = "tendres" > Tendres</option>
                        <option value = "wings" >Wings</option>
                        <option value =" dips" >Dips</option>
                        <option value = "hotDogs" >HotDogs</option>
                        
            </>
        )

        nbr=(
            
            <div className="form-floating">
                <input type="number" class="form-control" id="nbr"
                           value={nombre_fourni} 
                           onChange={event => setNombre_fourni(event.target.value) }
                    
                    />
                <label for="nbr" style={{color:"#000" , fontWeight:"bold"}}>Nombre fourni</label>
                {props.erreurNombre===true && (nombre_fourni === "" || nombre_fourni === "0" || nombre_fourni === 0 ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre fourni </p>}
            </div>
            
               
    )
}
        if(categorie==="legume"){
            TypeLegume=(
                <>
                            <option defaultValue={""}></option>
                            <option value="frite"> Frite</option>
                            <option value="laitue">Laitue</option>
                            <option value="tomate">Tomate</option>
                            <option value="oignon">oignon</option>
                            <option value="choux">Coux</option>
                            <option value="carotte">Carotte</option>
                            
                </>
            )}
 
    return ( 
        <>
        
        <section id="etape_section">
            <div className="container">
             <div className=" row">
                
                <div>
                
                        

                        <div className="col-sm-10 mb-3" id= "produitFourni">
                            <div className='row gy-2 gx-2'>
                                <div className="contenaireBox col-4">
                                    <label id="id_box"> Fournisseur </label>
                                    
                                    <label  id="id_boxValue" >{props.nom_fournisseur} </label>
                                    
                                </div>

                                    <div className="contenerProd col-4" >
                                        <label id="categorie"> Recepteur: </label>
                                        
                                        <label  id="categorieValue" >{props.recepteur} </label>
                                        
                                    </div>

                                    <div className="contenerProd col-4" >
                                        <label id="produit"> Type de bon: </label>
                                        
                                        <label  id="produitValue" >{props.type_bon} </label>
                                        
                                    </div>
                                
                            
                            </div>

                            <div className="row gy-2 gx-2 align-items-left">
                
                <div className="col-6">
                    <div className="form-floating  ">
                        <select className="form-select" aria-label="Default select example" id="categorie"
                                value={categorie} 
                                onChange={event => setCategorie(event.target.value)} 
                        required>
                        <option selected></option>
                        <option value="poulet">Poulet</option>
                        <option value="legume">Legume</option>
                        <option value="autre">Autre</option>
                        </select>
                        <label for="categorie" style={{color:"#000" , fontWeight:"bold"}} >  Categorie  </label>
                    </div>
                    {erreurCategorie ===true && categorie === ""  && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner une categorie </p>}
                </div>
                <div className="col-6 ">  
                    <div className="form-floating">
                        <select className="form-select" aria-label="Default select example" id="produit"
                                value={nom_produit} 
                                onChange={event => setNom_produit(event.target.value) }
                        required>
                        {TypePoulet}
                        {TypeLegume}

                        </select>
                        <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Type de produit</label>
                    </div>
                    {erreurProduit === true && nom_produit === "" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner un type de produit </p>}
                </div>  
                    <div className="col-5 " style={{paddingRight:'0px'}}>
                        <div className="form-floating">
                            <input type="number" class="form-control" id="poids"
                                value={poids_fourni} 
                                onChange={event => setPoids_fourni(event.target.value) }
                            />
                            
                            <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Poids fourni</label>
                        </div>
                        
                        {erreurPoids ===true && (poids_fourni === "" || poids_fourni === "0" || poids_fourni === 0 ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids fourni </p>}
                    </div>
                    <div className="col-1 mb-3" style={{ paddingLeft:'0px'}}>
                        <select className="form-select" aria-label="Default select example" id="categorie"
                                value={unite} 
                                onChange={event => setUnite(event.target.value)}
                                style={{height:"58px"}}
                                required>
                            <option ></option>
                            <option value="kg">Kg</option>
                            <option value="gramme">G</option>
                        </select>
                        {props.unite === "" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner l'unité </p>}
                    </div>
                    <div className="col-6 mb-3">
                        {nbr}
                    </div>
                    
            
            </div>
                               

                    <button className="btn btn-dark btn-outline-dark position-relative" type="button" id="boxBtn"
                        onClick={(e) => ajouterProduitFourni(e)} >
                        <i className="bi bi-plus-lg" style={{color: "white"}}> </i> AJOUTER PRODUIT
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                            {conteur}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                        </button>
                                             
                                               
                                             
                                             

                    </div>
                    <p style={{borderBottom :'5px solid', borderRadius:"3px" , borderColor:'#a6a6a6'}}></p>
                    
                    
                                              
                    
                </div>
                
                 
                </div>
                <div className="divTab" style={{width:"100%", height:"300px" , margin:"0px" , overflow : 'auto'}} >
                    <table className="table table-bordered" style={{width:"90%" , marginLeft:"20"}} > 
                    <thead style={{backgroundColor: "#16161"}}> 
                        <tr> 
                        
                        <th scope="col">Categorie </th> 
                        <th scope="col">Nom de produit</th> 
                        <th scope="col">Poids (Kg)</th> 
                        <th scope="col">Nombre</th> 
                        <th scope="col"></th> 
                        
                        </tr> 
                    </thead> 
                    <tbody >
                    { 
                        produitsFourni.map( 
                            (p, key) => 
                            <tr key={key}> 
                                 
                                <td>{p.categorie}</td> 
                                <td>{p.nom_produit}</td> 
                                <td>{p.poids_fourni/ 1000} </td> 
                                <td>{p.nombre_fourni}</td> 
                                <td style={{textAlign: 'center'}} >
                                    <button className='btn1 me-2' style={{width:'40%' , backgroundColor:"black" }} onClick={()=>{ajouterBox(p.id_prod, p.categorie, p.nom_produit, p.poids_fourni, p.nombre_fourni) ;  handleShow()}}> ajouter</button>
                                    <button className='btn1' style={{width:'40%' , backgroundColor: "gray" }}onClick={()=>{AfiicherBoxes(p.id_prod)} } > Afficher</button>
                                </td>
                                
                                
                                
                            
                            </tr>    )} 
                        </tbody> 
                        </table> 
                    </div>
                
                <button className="btn1" style={{width:"20%" , marginLeft:"70%"}} onClick={handleShowRecap} >VALIDER LE PROCESS</button>
            </div>
             <ModalAjoutBoxes   
                                show= {show} 
                                handleClose= {handleClose} 
                                handleShow= {handleShow}
                                produitFourni= {produitFourni}
                                id= {produit_id}
                                categorie= {produit_categorie}
                                type= {produit_type}
                                poids= {produit_poids}
                                nombre= {produit_nombe}
                                poidsRestant = {poidsRestant}
                                
                                                   
                 />
            {showAffichage && <AffichageBoxes     show= {showAffichage} 
                                handleClose= {handleCloseAffichage} 
                                handleShow= {handleShowAffichage}
                                id= {produit_id}
                                />}

            {showRecap &&     <Recape     show= {showRecap} 
                                            handleClose= {handleCloseRecap} 
                                            
                                />}
            
           </section>
            
        </>
     )
    
}
export default Enregistrement;

