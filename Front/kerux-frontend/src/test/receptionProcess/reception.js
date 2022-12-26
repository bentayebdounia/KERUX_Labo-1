import React ,{useState,useEffect} from 'react'
import ProcessService from '../../service/service.process'
import serviceFournisseur from '../../service/service.fournisseur'
import ModalReception from './ModalReception'
import Enregistrement from '../enregistrement/enregistrement'
import './fournisseur.css'

const Reception = (props) => {

    //modal de confirmation
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [toggle, setToggle] = useState (false) 
    const toggleshow = () => setToggle(true)
    const toggleDisplay = () => setToggle (false)

    const [toggleConfirme, setToggleConfirme] = useState (false)
    const toggleConfirmeTrue = () => setToggleConfirme (true)
    const toggleConfirmeFalse = () => setToggleConfirme (false)

    const [toggleRecomendation, setToggleRecomendation] = useState(true)
    const toggleRecomendationTrue = () => setToggleRecomendation (true)
    const toggleRecomendationFalse = () => setToggleRecomendation(false)

    const [id_bon, setId_bon] = useState()
    const [achetLivreur, setAchetlivreur] = useState()
 
    const [nom_fournisseur, setNomFournisseur] = useState('')
    const [fk_fournisseur, setFk_fournisseur] = useState('')
    const [acheteur, setAcheteur] = useState('')
    const [livreur, setLivreur] = useState('')
    const [type_bon, setTypebon] = useState('')
    const [recepteur, setRecepteur] = useState('')
    const [bonScanner, setBonScanner] = useState('')

    var  reception , Fournisseur

    const [fournisseur, setFournisseur] = useState([{
        nom_fournisseur:"",
        id_fournisseur: ""
    }])

    const [fournisseur2, setFournisseur2] = useState([{
        nom_fournisseur:"",
        id_fournisseur: ""
    }])

    function getFournisseur(){
        serviceFournisseur.getAllFournisseur()
        .then((res) => {
            setFournisseur(res.data)
        })
    }

    const getVlue =() =>{
        serviceFournisseur.getFournisseurByNomOrCategorie(nom_fournisseur,nom_fournisseur)
        .then((res) => {
            setFournisseur2(res.data)
        })
    }

     //get all fournisseur
     useEffect(()=>{
        getFournisseur()
        getVlue()
    })

    useEffect(()=>{
        toggleTrue()

    },[toggleConfirme])
     
    

    function toggleTrue(){
        if (toggleConfirme){
            //ajouter un bon au bdd
            
            ProcessService.ajouterBon(fk_fournisseur, acheteur, type_bon, recepteur , livreur).then( (res)=> {
            
            setId_bon(res.data[0].id_bon)
                toggleshow() //afficher le component de ajouter un produit fourni
                
            })              
        }
    }

    const confirmer = (e) => {
        e.preventDefault()
        handleShow()  //modal de confirmation

    }

    function select () {
        
        toggleRecomendationFalse()
       
    }
 
        Fournisseur=(
                        <>
                        {nom_fournisseur ==='' && 
                         (<div className='dataResult'>
                         {fournisseur.map((value, key) => {
                                     return (
                                         <a className='dataItem' onClick={()=>{setNomFournisseur(value.nom_fournisseur); setFk_fournisseur(value.id_fournisseur)}}>
                                             <p > {value.nom_fournisseur}</p>
                                         </a>
                                     )
                                 })}
                        </div>)
                         
                         } 
                          {nom_fournisseur !=='' && 
                         (<div className='dataResult'>
                         {fournisseur2.map((value, key) => {
                                     return (
                                         <a className='dataItem' onClick={()=>{setNomFournisseur(value.nom_fournisseur); setFk_fournisseur(value.id_fournisseur) }} >
                                             <p > {value.nom_fournisseur}</p>
                                         </a>
                                     )
                                 })}
                     </div>)
                         
                         } 
                        

                        </>
    )

    
        reception = (
            <>
                <form class="needs-validation" noValidate>
                <div>
                
                    <div className="mb-3 row ">
                        <label htmlFor="fournisseur"  className="col-sm-2 col-form-label" >Fournisseur</label>
                        <div className="col-sm-10 dropdown">
                        <input type="text"  className="form-control" id="fournisseur" value={nom_fournisseur} onChange={(e)=> setNomFournisseur(e.target.value)} onClick={select} required/>
                         {Fournisseur}
                        </div>
                        
                    </div>
                    
                </div>
                
    
                <div className="mb-3 row">
                    <label htmlFor="acheteur" className="col-sm-2 col-form-label"  >Acheteur/Livreur</label>
                    
                </div>

                <div className="mb-3 row">
                    <div class="col-sm-1 form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  onChange={(e)=> {setAchetlivreur(false) ; setLivreur('')}} required/>
                        <label class="form-check-label" forHtml="flexRadioDefault1">
                           Acheteur   
                        </label>
                    </div>

                    <div class="col-sm-1 form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  onChange={(e)=> {setAchetlivreur(true) ; setAcheteur('')}} required/>
                        <label class="form-check-label" forHtml="flexRadioDefault2">
                            Livreur
                        </label>
                    </div>

                    <div className="col-sm-10">
                      <input type="text"  className="form-control" id="acheteur" value={achetLivreur ? livreur : acheteur} onChange={(e)=>{ achetLivreur  ? (setLivreur(e.target.value) ) : (setAcheteur(e.target.value) )}} required/>
                    </div>

                </div>
    
                <div className="mb-3 row">
                    <label htmlFor="typeBon" className="col-sm-2 col-form-label">Type de bon</label>
                    <div className="col-sm-10">
                      <select className="form-select" aria-label="Default select example" id="typeBon" value={type_bon} onChange={(e)=> setTypebon(e.target.value)}  required>
                        <option defaultValue={""}></option>
                        <option value="bon de livraison">Bon de livraison</option>
                        <option value="bon d'achat">Bon d'achat</option>
                      </select>
                  </div>
                </div>
    
                <div className="mb-3 row">
                    <label htmlFor="recepteur"  className="col-sm-2 col-form-label">Récepteur</label>
                    <div className="col-sm-10">
                      <input type="text"  className="form-control" id="recepteur" value={recepteur} onChange={(e)=> setRecepteur(e.target.value)} required/>
                    </div>
                </div>
    
                <div className="input-group">
                    <input type="file" className="form-control" id="inputfile" aria-describedby="inputGroupFileAddon04" aria-label="Upload" value={bonScanner} onChange={(e)=> setBonScanner(e.target.value)} required/>
                </div>
    
                <div className="d-grid gap-2 my-4">
                    <button className="btn1" type="submit"  >Valider</button>
                    
                </div>

                </form>

                {
                   // Example starter JavaScript for disabling form submissions if there are invalid fields
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
                                if (form.checkValidity()) confirmer(event)
                                
                        
                                form.classList.add('was-validated')
                                }, false)
                            })
                        })()
                }
            
            </>
            
        )

    

    return ( 
       
        <div className="containerMain">
            
            <section id="etape_section">
            {toggle && <h3 style={{marginLeft:'8%'}}> Ajouter un produit fourni: </h3> }
            <div className="container">
                

                    {!toggle && reception}
                    {toggle && <Enregistrement  toggleDisplay = {toggleDisplay}  id_bon ={id_bon} />}
                    
                
                
            </div>
            {show && <ModalReception show={show} handleClose={handleClose} handleShow={handleShow}
                            toggleShow = {toggleshow}
                            nom_fournisseur= {nom_fournisseur}
                            fk_fournisseur={fk_fournisseur}
                            acheteur={acheteur} 
                            type_bon={type_bon}
                            recepteur={recepteur}
                            toggleConfirmeTrue={toggleConfirmeTrue}
        />}
        </section>

        
        
        
        </div>
     );
}
 
export default Reception;