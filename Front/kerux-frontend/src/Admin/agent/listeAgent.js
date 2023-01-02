import React,{useState,useEffect} from 'react'
import ServiceAdmin from '../../service/serviceAdmin'
//import ServiceRole from '../../service/service.role'

export default function ListeAgent() {
    const [personnes , setPersonnes] = useState([])
    const [role, setRole] = useState('')
    const [recherche, setRecherche] = useState('')
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
  return (
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
