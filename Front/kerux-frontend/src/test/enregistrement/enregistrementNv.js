import React ,{useState,useEffect} from 'react'
//import EnregitrementService from '../../service'
import ModelReponse from '../../Models/Model.repense'
import ModalAjoutBoxes from './ModalAjouterBoxes'
import AffichageBoxes from './boxAffichage'
import Recape from './recape'
import Reception from '../receptionProcess/reception'
import './enreg.css'
import '../styleCss/btn.css'
import '../styleCss/tableau.css'

const Enregistrement = (props) => {


    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showAffichage, setShowaffichage] = useState(false)
    const handleCloseAffichage = () => setShowaffichage(false)
    const handleShowAffichage = () => setShowaffichage(true)

    const [showRecap, setShowRecap] = useState(false)
    const handleCloseRecap = () => setShowRecap(false)
    const handleShowRecap = () => setShowRecap(true)

    const [toggle, setToggle] = useState (false )  
    const toggleshow = () => setToggle(true) 
    const toggleDisplay = () => setToggle (false)
    
    const [idprod, setIdprod] = useState(1)
    
    const [produitsFourni, setProduitsfourni] = useState([])
    const [categorie, setCategorie] = useState()
    const [nom_produit, setNom_produit] = useState()
    const [poids_fourni, setPoids_fourni] = useState()
    const [nombre_fourni, setNombre_fourni] = useState()
    const [unite, setUnite] = useState('kg')
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

    const [poidsRester, setPoidsrester] = useState() //valeur de reste de poids fourni
    const [nombreRester, setNombrerester] = useState() //valeur de reste de nombre de poulets fourni
    const [p , setP] = useState()
    const [n , setN] = useState()
    const [length, setLength] = useState()
 /*  
   useEffect(()=>{
    
    setProduitsfourni (JSON.parse(localStorage.getItem('produitsFournis') || "[]"))
    //return produitFourni
   },[]) // l'erreur est la ***********************************************************************************************************************
*/
    function plus () {

        setConteur(conteur+1)
        

        console.log(conteur);
        var prod= {
            id_prod: idprod,
            categorie : categorie, 
            nom_produit:nom_produit, 
            poids_fourni:transforme(unite , poids_fourni), 
            nombre_fourni: parseInt (nombre_fourni), 
            id_bon:props.id_bon,
            id_fournisseur: props.fk_fournisseur,
            poidsRester: transforme(unite , poids_fourni),
            nombreRester: parseInt (nombre_fourni)

        }
        produitsFourni.push(prod)
        localStorage.setItem ('produitsFournis', JSON.stringify(produitsFourni))

        setIdprod(idprod+1)
        console.log(produitFourni);
        setProduitForuni(prod)
        // handleShow()
        setCategorie("")
        setNom_produit("")
        setPoids_fourni("")
        setNombre_fourni("")
        
     
    }

    function transforme(unite, poids){
        console.log(unite);
        if (unite==="kg") {
            console.log(poids);
            return poids*1000
        }
        else if(unite==="gramme") return poids
    }

    function verificationPoids(poids, nombre , unite){
        
        console.log(poids*1000/nombre)
        return transforme(unite, poids)/nombre

    }

    const  ajouterProduitFourni = () => {

        if (categorie !== '' && nom_produit!== '' && (poids_fourni !== '' && poids_fourni !== '0' && poids_fourni !== 0) && unite !=="" ){
            if (categorie === 'poulet' ){
                if(nombre_fourni !== '' && nombre_fourni !== '0' && nombre_fourni !== 0){
                    console.log(poids_fourni);
                    if(verificationPoids( poids_fourni, nombre_fourni, unite)>=1500 && verificationPoids(poids_fourni, nombre_fourni, unite)<=2500)
                        plus()
                    else alert ('le nombre est incorrect' )
                }
                else setErreurnombre(true)
            } 
            else {
                    
                    plus()
                }

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

      const mettreJourTabeauProduit = () => {
        setProduitsfourni (JSON.parse(localStorage.getItem('produitsFournis') || "[]"))
      }

      const ajouterBox = (id, categorie, type, poids, nombre) => {
        setProduit_id(id)
        setProduit_type(type)
        setProduit_categorie(categorie)
        setProduit_poids(poids)
        setProduit_nombre(nombre)
      }

      

      const AfiicherBoxes = (id, poid) => {
        setProduit_id(id) 
        setP(poid)
        handleShowAffichage()
      }

      const supprimerProduitFourni=(id)=>{
        
        var tab= []
        tab= JSON.parse(localStorage.getItem('produitsFournis'))
       for(var i=0; i<tab.length; i++){
            if (tab[i].id_prod === id){
                tab.splice(i,1)
            }
       }
         
        localStorage.setItem('produitsFournis', JSON.stringify(tab))
        localStorage.removeItem('boxes'+id)
        setProduitsfourni (JSON.parse(localStorage.getItem('produitsFournis') || "[]"))
      }
      const modifierPoidsRester = (idProd, poidRester ) => {
        var tab= []
        tab= JSON.parse(localStorage.getItem('produitsFournis'))
        for (let i = 0; i < tab.length; i++) {
            if(tab[i].id_prod === idProd)
              tab[i].poidsRester= poidRester
           
        }
        
        setP(poidRester)
        localStorage.setItem('produitsFournis', JSON.stringify(tab))
        setProduitsfourni (JSON.parse(localStorage.getItem('produitsFournis') || "[]"))
      }
      const modifierNombreRester = (idProd, nombreRester ) => {
        var tab= []
        tab= JSON.parse(localStorage.getItem('produitsFournis'))
        for (let i = 0; i < tab.length; i++) {
            if(tab[i].id_prod === idProd)
              tab[i].nombreRester= nombreRester
           
        }
        setN(nombreRester)
        localStorage.setItem('produitsFournis', JSON.stringify(tab))
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
            <>
                <div className="col-2">
                    <label htmlFor="nbr" >Nombre fourni</label>
                </div>
                <div  className="col-4">
                    <input type="number" className="form-control" id="nbr"
                            value={nombre_fourni} 
                            onChange={event => setNombre_fourni(event.target.value) }
                        
                        />
                    
                    {erreurNombre===true && (nombre_fourni === "" || nombre_fourni === "0" || nombre_fourni === 0 ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre fourni </p>}
                    
                </div>
            </>
               
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
        {toggle === false && 
        <section id="etape_section">
            <div className="container" >
                <div className="row" style={{alignItems: "center", justifyContent: "center",}}>
                    
                    
                    
                            <div className="col-sm-10 mb-3" id= "produitFourni" >
                                <div className='row gy-2 gx-2 mb-3' >
                                    <div className="contenaireBox col-4">
                                        <label id="id_box"> Fournisseur: </label>
                                        
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

                                <div className="row gy-2 gx-2 align-items-center">
                                
                                    <div className="row mb-2">
                                        <div className="col-2 ">
                                            <label  htmlFor="categorie" >  Categorie  </label>
                                        </div>
                                        <div className="col-4 ">
                                            <select className="form-select col-2" aria-label="Default select example" 
                                                    value={categorie} 
                                                    onChange={event => setCategorie(event.target.value)} 
                                            required>
                                                <option defaultValue="" ></option>
                                                <option value="poulet">Poulet</option>
                                                <option value="legume">Legume</option>
                                                <option value="autre">Autre</option>
                                            </select>
                                            {erreurCategorie ===true && categorie === ""  && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner une categorie </p>}
                                        </div>
                                        
                                    
                                        
                                        <div className="col-2">
                                            <label htmlFor="produit" >Type de produit</label>
                                        </div>
                                        <div className="col-4">
                                            <select className="form-select" aria-label="Default select example" 
                                                    value={nom_produit} 
                                                    onChange={event => setNom_produit(event.target.value) }
                                            required>
                                            {TypePoulet}
                                            {TypeLegume}

                                            </select>
                                            {erreurProduit === true && nom_produit === "" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner un type de produit </p>}
                                        </div>
                                    
                                    </div>  
                                    
                                    <div className="row mb-3">
                                        <div className="col-2 " style={{paddingRight:'0px'}}>
                                            <label htmlFor="poids" >Poids fourni</label>
                                        </div>

                                        <div className="col-2">   
                                            <input type="number" class="form-control" id="poids"
                                                    value={poids_fourni} 
                                                    onChange={event => setPoids_fourni(event.target.value) }
                                                />
                                                {erreurPoids ===true && (poids_fourni === "" || poids_fourni === "0" || poids_fourni === 0 ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids fourni </p>}
                                        </div>

                                        <div className="col-2 ">
                                            <select className="form-select" aria-label="Default select example" 
                                                    value={unite} 
                                                    onChange={event => setUnite(event.target.value)}
                                                    
                                                        required>
                                                    <option value="kg">Kg</option>
                                                    <option value="gramme">Gr</option>
                                            </select>
                                            {unite === "" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner l'unité </p>}
                                        </div>
                                        
                                            {nbr}
                                        

                                    </div>
                                    
                                    
                                    
                            
                                </div>
                                

                                <button className="btn btn-dark btn-outline-dark position-relative" type="button" id="boxBtn"
                                    onClick={(e) => ajouterProduitFourni(e)} >
                                    <i className="bi bi-plus-lg" style={{color: "white" , fontStyle:"normal"}}> AJOUTER PRODUIT </i> 
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{background: "#f0f0f0" , color: "black" , fontStyle:"normal"}}>
                                        {conteur}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </button>
                            
                            </div>
                            <p style={{borderBottom :'5px solid', borderRadius:"3px" , borderColor:'#a6a6a6'}}></p>
                    
                    
                    
                </div>
                <div className="divTable" >
                    <table className="table table-bordered tableProduitsFournis"  > 
                        <thead style={{backgroundColor: "#16161"}}> 
                            <tr> 
                                <th scope='col'></th>
                                <th scope="col">Categorie </th> 
                                <th scope="col">Nom de produit</th> 
                                <th scope="col">Poids (Kg)</th> 
                                <th scope="col">Nombre</th> 
                                <th scope="col">Action</th> 
                            </tr> 
                        </thead> 

                        <tbody >
                        { 
                            produitsFourni.map( 
                                (p, key) => 
                                <tr key={key}> 
                                    <td style={{textAlign:"center"}}><i className="bi bi-x-circle" style={{color:"#7B170F"}} onClick={()=> {supprimerProduitFourni(p.id_prod)}}></i></td>
                                    <td>{p.categorie}</td> 
                                    <td>{p.nom_produit}</td> 
                                    <td>{p.poids_fourni/ 1000}  / {p.poidsRester / 1000} </td> 
                                    <td>{p.nombre_fourni} / {p.nombreRester} </td> 
                                    <td style={{textAlign: 'center'}} >
                                        {p.poidsRester !==0 && <button className='btnTableAjouer me-2'  onClick={()=>{ajouterBox(p.id_prod, p.categorie, p.nom_produit, p.poids_fourni, p.nombre_fourni); setPoidsrester( p.poidsRester ); setNombrerester(p.nombreRester);  handleShow()}}> <i className="bi bi-plus-lg" style={{color:"#7B170F"}}></i></button>}
                                        {p.poidsRester < p.poids_fourni && <button className='btnTableAfficher' onClick={()=>{AfiicherBoxes(p.id_prod, p.poidsRester)} } > <i className="bi bi-list-ul" style={{color:"#7B170F"}}></i></button>}
                                    </td>
                                    
                                    
                                    
                                
                                </tr>    )} 
                        </tbody> 
                    </table> 
                </div>
                
                <button className="btn1" style={{width:"20%" , marginLeft:"70%"}} onClick={() =>{alert(props.id_bon); handleShowRecap()}} >VALIDER LE PROCESS</button>
            
            </div>

            {show && <ModalAjoutBoxes   
                                show= {show} 
                                handleClose= {handleClose} 
                                handleShow= {handleShow}
                                produitFourni= {produitFourni}
                                id= {produit_id}
                                categorie= {produit_categorie}
                                type= {produit_type}
                                poids= {produit_poids}
                                nombre= {produit_nombe}
                                poidsRestant = {poidsRester}
                                nombreRestant = {nombreRester}
                                mettreJourTabeauProduit = {mettreJourTabeauProduit}
                                                      
                 />}
            {showAffichage && <AffichageBoxes   show= {showAffichage} 
                                handleClose= {handleCloseAffichage} 
                                handleShow= {handleShowAffichage}
                                id= {produit_id}
                                poidsRester = {p}
                                nombreRester = {n}
                                modifierPoidsRester= {modifierPoidsRester}
                                />}

            {showRecap &&     <Recape       show= {showRecap} 
                                            handleClose= {handleCloseRecap} 
                                            recepBtn={props.recepBtn}
                                            toggleDisplay = {props.toggleDisplay}
                                            id_bon = {props.id_bon}
                                            fk_fournisseur= {props.fk_fournisseur}
                                            toggleshow = {toggleshow}
                                            
                                />}

            
            
           </section>
}
          {toggle === true && <Reception recepBtn={props.recepBtn} enrgBtn ={props.enrgBtn}/>}
            
        </>
     )
    
}
export default Enregistrement;

