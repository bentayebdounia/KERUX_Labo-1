import React ,{useState,useEffect} from 'react'
import serviceProduit from '../../service/service.produit'

const ListProduit = () => {

    const [categorie, setCategorie]= useState('')
    const [categories, setCategories]= useState([])

    const [produits, setProduits] = useState([])
    const [produits2, setProduits2] = useState([])
    //const [produits, setProduits] = useState([])
    //const [produit, setProduit] = useState('')
    

    useEffect(() => {
        serviceProduit.getCategorie()
        .then ((res) => {
            setCategories(res.data)
        })

        
    })

    if (categorie ==="") {
        serviceProduit.getProduit()
        .then ((res) => {
            setProduits(res.data)
        })
    }

    else {
        console.log(categorie);
        serviceProduit.getProduitByCategorie(categorie)
        .then ((res) => {
            
            setProduits(res.data)
            
        })

       
        
    }

    return (
        <>
           <div>
                <h1 id="titre" >Liste des produits</h1>
                <div>
                <section className="section" id="modifierAgent">
                    <div className="mb-3 row agent">
                    <label for="roleAgentAjout" className="col-sm-2 col-form-label">Categorie</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" id="roleAgentAjout" style={{width:"50%"}} value={categorie} onChange={(e)=> setCategorie(e.target.value)} required>
                                <option defaultValue={""}></option>
                                 {categories.map( (categorie,key) =>
                                
                                                <option value={categorie.nom_categorie}> {categorie.nom_categorie} </option>
                                            )}
                                </select>

                                </div>
                    
                        
                    
                    <div className="divTab">
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nom produit </th>
                            <th scope="col">Durée d'experation</th>
                            <th scope="col">Categorie</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                produits.map(
                                    (produit, key) =>
                                        <tr key={key}>
                                            <td>{produit.id_produit}</td>
                                            <td>{produit.nom_produit}</td>
                                            <td>{produit.duree_experation}</td>
                                            <td>{produit.fk_categorie}</td>
                                            
                                            
                                            
                                    

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
        
        </>
    )

}

export default ListProduit