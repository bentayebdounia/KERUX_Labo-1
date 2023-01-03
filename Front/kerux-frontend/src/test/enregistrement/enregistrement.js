import React ,{useState,useEffect} from 'react'
//import EnregitrementService from '../../service'
import ModelReponse from '../../Models/Model.repense'
import ProduitFourni from './produitFourni'
import ModalAjoutBoxes from './ModalAjouterBoxes'
import EnregistrementService from '../../service/service.enregistrement'
import './enreg.css'

const Enregistrement = (props) => {

   // const [test, setTest] = useState(false)
    
    

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showRecepion, setShowreception] = useState(false)
    const handleShowReception = () => setShowreception(true)

    
    
   
    const [produits,setProduits] = useState([{
        categorie: "",
        nom_produit: "",
        poids: 0,
        unite:"",
        nombre: 0,
        date:new Date()
    }])

    
    const [poids, setPoids] = useState(0)
    const [produitFourni, setProduitForuni] = useState({
            categorie: "",
            nom_produit: "", 
            id_produit: ""
    })
    
    const [conteur, setConteur] = useState (0)

    const [erreurCategorie, setErreurcategorie] = useState(false)
    const [erreurProduit, setErreurproduit] = useState(false)
    const [erreurPoids, setErreurpoids] = useState(false)
    const [erreurNombre, setErreurnombre] = useState(false)

   

    function plus () {

        setConteur(conteur+1)
        const newProduits = [...produits]
        EnregistrementService.ajouterProduitFournit(produits[0].categorie, produits[0].nom_produit, transforme(produits[0].unite , produits[0].poids), produits[0].nombre, props.id_bon)
        .then((res) => {
            
            setProduitForuni(res.data[0])

        })

        console.log(produitFourni);
        handleShow()
                            
        newProduits.push({
            categorie:'',
            nom_produit:'',
            poids:0,
            unite:"",
            nombre:0,
            date:new Date()
        })
        
        setProduits(newProduits.sort((a,b) => {
            if(a.date < b.date)
                return 1
            if(a.date > b.date)
                return -1
            return 0
        }))

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

    const  plusId = () => {

        if (produits[0].categorie !== '' && produits[0].nom_produit!== '' && (produits[0].poids !== '' && produits[0].poids !== '0' && produits[0].poids !== 0) && produits[0].unite !=='' ){
            if (produits[0].categorie === 'poulet' ){
                if(produits[0].nombre !== '' && produits[0].nombre !== '0' && produits[0].nombre !== 0){
                    console.log(produits[0].poids);
                    if(verificationPoids( produits[0].poids, produits[0].nombre, produits[0].unite)>=1500 && verificationPoids(produits[0].poids, produits[0].nombre, produits[0].unite)<=2500)
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

      function terminerProcess() {
        
       props.toggleDisplay()
      }
 
    return ( 
        <>
        
        <section id="etape_section">
            <div className="container">
             <div className="mb-3 row">
                
                <div>
                {produits.map((box,key) => {
                    return ( 
                        <>
                        <div className="col-sm-10 mb-3" id= "produitFourni" key={key}>
                                <ProduitFourni 
                                    categorie = {box.categorie} onCategorieChange={newCategorie => {
                                    const newProduits = [...produits]
                                    newProduits[key].categorie = newCategorie
                                    setProduits(newProduits)
                                    }} 

                                    nom_produit = {box.nom_produit} onNom_produitChange={newNom_produit => {
                                        const newProduits = [...produits]
                                        newProduits[key].nom_produit = newNom_produit
                                        setProduits(newProduits)
                                        }} 

                                    poids = {box.poids} onPoidsChange={newPoids => {
                                        const newProduits = [...produits]
                                        newProduits[key].poids = newPoids
                                        setProduits(newProduits)
                                        }} 
                                    unite= {box.unite} onUniteChange={newUnite => {
                                        const newProduits = [...produits]
                                        newProduits[key].unite = newUnite
                                        setProduits(newProduits)
                                        }} 
                                    
                                    nombre = {box.nombre} onNombreChange={newNombre => {
                                        const newProduits = [...produits]
                                        newProduits[key].nombre = newNombre
                                        setProduits(newProduits)
                                        }} 
                                
                                        erreurCategorie = {erreurCategorie}
                                        erreurProduit = {erreurProduit}
                                        erreurPoids = { erreurPoids}
                                        erreurNombre = {erreurNombre}
                                
                                />
                            {key === 0 && (<>

                                            <button className="btn btn-dark btn-outline-dark position-relative" type="button" id="boxBtn"
                                                onClick={(e) => plusId(e)} >
                                                <i className="bi bi-plus-lg" style={{color: "white"}}> </i> Ajouter des boxes
                                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                                                    {conteur}
                                                    <span class="visually-hidden">unread messages</span>
                                                </span>
                                             </button>
                                             
                                                </> )
                                             }
                                             
                                             

                    </div>
                    {key===0 && <p style={{borderBottom :'5px solid', borderRadius:"3px" , borderColor:'#a6a6a6'}}></p>}
                    
                    </>
                        
                    ) })} 
                                              
                    
                </div>
                
                
                 
                </div>
                <button className="btn1" style={{width:"20%" , marginLeft:"70%"}} onClick={()=>{props.toggleDisplay()} } >FIN PROCESS</button>
            </div>
             <ModalAjoutBoxes   
                                show={show} 
                                handleClose={handleClose} 
                                handleShow={handleShow}
                                produitFourni={produitFourni}
                                                   
                 />
           
            
           </section>
            
        </>
     )
    
}
export default Enregistrement;

