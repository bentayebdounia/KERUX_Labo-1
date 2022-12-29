import React ,{useState,useEffect} from 'react'
//import EnregitrementService from '../../service'
import ModelReponse from '../../Models/Model.repense'
import ProduitFourni from './produitFourni'
import ModalAjoutBoxes from './ModalAjouterBoxes'
import EnregistrementService from '../../service/service.enregistrement'
import './enreg.css'

import Reception from '../receptionProcess/reception'

const Enregistrement = (props) => {

    const [test, setTest] = useState(false)
    
    const [id , setId] = useState('')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showRecepion, setShowreception] = useState(false)
    const handleShowReception = () => setShowreception(true)

    var testplus = true
    var testNotExist = false
    
    const [message, setMessage] = useState('')
    
    const [process, setProcess] = useState({
        fk_proditfourni: "",
        categorie: "",
        nom_produit: "",
        stock: "",
        etape: ""
    })

    const [produits,setProduits] = useState([{
        categorie: "",
        nom_produit: "",
        poids: 0,
        nombre: 0,
        date:new Date()
    }])

    const [id_generateNet, setId_generateNet] = useState('')
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
        EnregistrementService.ajouterProduitFournit(produits[0].categorie, produits[0].nom_produit, produits[0].poids, produits[0].nombre, props.id_bon)
        .then((res) => {
            
            setProduitForuni(res.data[0])

        })

        console.log(produitFourni);
        handleShow()
                            
        newProduits.push({
            categorie:'',
            nom_produit:'',
            poids:0,
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

    const  plusId = () => {

        if (produits[0].categorie !== '' && produits[0].nom_produit!== '' && (produits[0].poids !== '' && produits[0].poids !== '0' && produits[0].poids !== 0) ){
            if (produits[0].categorie === 'poulet' ){
                if(produits[0].nombre !== '' && produits[0].nombre !== '0' && produits[0].nombre !== 0){
                    plus()
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
        
        handleShowReception()
        props.toggleDisplay()
      }
 
    return ( 
        <>
            {test===false && <div className="mb-3 row">
                
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
                                                <i className="bi bi-plus-lg" style={{color: "white"}}> Ajouter des boxes</i>
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
                
                
                 
            </div>}
            
             <ModalAjoutBoxes   
                                show={show} 
                                handleClose={handleClose} 
                                handleShow={handleShow}
                                produitFourni={produitFourni}
                                                   
                 />
           
            { showRecepion && <Reception />

            }
        </>
     )
    
}
export default Enregistrement;