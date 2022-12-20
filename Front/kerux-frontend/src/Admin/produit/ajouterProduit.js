import React ,{useState,useEffect} from 'react'

import serviceProduit from '../../service/service.produit'

const AjouterProduit = (props) => {

    const [categories, setCategories] = useState([])
    const [categorie, setCategorie] = useState('')
    const [nomProduit , setNomproduit] = useState('')
    const [dateExperation, setDate_experation] = useState ('')
    
    useEffect(() => {
        serviceProduit.getCategorie()
        .then ((res) => {
            setCategories(res.data)
        })
    })

   

    const fonctionAjouter = async(e) => {
        e.preventDefault();
       
         await serviceProduit.ajouterProduit(categorie, nomProduit, dateExperation)
        .then ((res)=>{
            console.log(res.data);
                
        })
        
    }

   
    


    return ( 
        <>
            <div>
                <h1 id="titre" >Ajouter Produit</h1>
                
                <section className="section" id="ajouterAgent">
                    <form className="needs-validation" name="formModify" noValidate>
                    <div className="mb-3 row">
                            <label for="roleAgentAjout" className="col-sm-2 col-form-label">Categorie</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={categorie} onChange={(e)=> setCategorie(e.target.value)} required>
                                <option defaultValue={""}></option>
                                 {categories.map( (categorie,key) =>
                                
                                                <option value={categorie.id_categorie}> {categorie.nom_categorie} </option>
                                            )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Nom de produit</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="adresseAgent" value={nomProduit} onChange={(e)=> setNomproduit(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="prenomAgent" className="col-sm-2 col-form-label " >La durée experation</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="prenomAgent" value={dateExperation} onChange={(e)=> setDate_experation(e.target.value)} required/>
                            </div>
                        </div>
 

                    
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
                                  if (form.checkValidity()) fonctionAjouter(event)
                          
                                  form.classList.add('was-validated')
                                }, false)
                              })
                          })()
                    }
                </section>
    
            </div>
        </>
     )
}
 
export default AjouterProduit;