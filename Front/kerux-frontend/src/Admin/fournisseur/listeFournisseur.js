import React ,{useState,useEffect} from 'react'
import serviceFournisseur from '../../service/service.fournisseur'

const ListFournisseur = () => {

    
    const [rechercheValue, setRechercheValue]= useState('')

    const [fournisseurs, setFournisseurs] = useState([])
    const [fournisseur, setFournisseur] = useState('')
    //const [produits, setProduits] = useState([])
    //const [produit, setProduit] = useState('')
    

    if(rechercheValue==="") {
        serviceFournisseur.getAllFournisseur()
        .then ((res) => {
            setFournisseurs(res.data)
        })

        
    }

    const getFournisseur = () =>{
        
        serviceFournisseur.getFournisseurByNomOrCategorie(rechercheValue)
        .then ((res) => {
            
            setFournisseurs(res.data)
            
        })

       
        
    }

    return (
        <>
           <div>
                

                <h1 id="titre" >Liste des fournisseurs</h1>
                <div>
                <section className="section" id="modifierAgent">
                <div className="input-group col-sm-9">
                <input type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2" value={rechercheValue} onChange={(e)=> setRechercheValue(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>getFournisseur(e)}>
                    <i className="bi bi-search" style={{fontSize: "1.25rem"}}></i>
                </button>
                </div>
                    
                    <div className="divTab">
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Nom fournisseur</th>
                            <th scope="col">Forme juridique </th>
                            <th scope="col">Adresse fournisseurs</th>
                            <th scope="col">Email</th>
                            <th scope="col">Activite</th>
                            <th scope="col">Modalite de paiement</th>
                            <th scope="col">Type de paiement</th>
                            <th scope="col">Nature de livraison</th>
                            <th scope="col">Categorie</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fournisseurs.map(
                                    (fournisseur, key) =>
                                        <tr key={key}>
                                           <td>{fournisseur.nom_fournisseur}</td>
                                            <td>{fournisseur.forme_juridique}</td>
                                            <td>{fournisseur.adresse_fournisseur}</td>
                                            <td>{fournisseur.email}</td>
                                            <td>{fournisseur.activite}</td>
                                            <td>{fournisseur.modalite_paiement}</td>
                                            <td>{fournisseur.type_paiement}</td>
                                            <td>{fournisseur.nature_livraison}</td>
                                            <td>{fournisseur.categorie}</td>
                                            
                                            
                                            
                                    

                                        </tr>
                                )
                            }
                            
                        </tbody>
                        </table>
                    </div>

                    

                    
                </section>
                </div>
                </div>
        
        </>
    )

}

export default ListFournisseur