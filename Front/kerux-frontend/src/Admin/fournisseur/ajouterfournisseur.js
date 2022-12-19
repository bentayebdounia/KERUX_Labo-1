import React ,{useState,useEffect} from 'react'
import Contact from './contact';
import ServiceFournisseur from '../../service/service.fournisseur';

const AjouterFournisseur = (props) => {

    const [nomFournisseur , setNomFournisseur] = useState('')
    const [categorie, setCategorie] = useState('')
    const [formJuridique, setFormJuridique] = useState ('')
    const [adresse, setAdresse] = useState()
    const [email, setEmail] = useState('')
    const [activite, setActivite]= useState('')
    const [modalite, setModalite] = useState('')
    const [typePaiement, setTypePaiement] = useState('')
    const [natureLivraison, setNaturelivraison] = useState('')


    const [nomContact, setNomContact] = useState('')
    const [numContact, setNumContact] = useState('')

    
    
    const [contacts,setContacts] = useState([{
        nomContact:'',
        numContact:0,
        
        date:new Date()
    }])

    let contact_

    const fonctionAjouter = async(e) => {
        e.preventDefault();
        console.log(contacts);
        //console.log(nomFournisseur, formJuridique, adresse, email,  activite, modalite, typePaiement, natureLivraison, categorie);
        await ServiceFournisseur.ajouterFournisseur(nomFournisseur, formJuridique, adresse, email,  activite, modalite, typePaiement, natureLivraison, categorie)
        .then ((res)=>{
            console.log(res.data);
            for (var i=1 ; i<= contacts.length ; i++) {
                console.log(res.data.id_fournisseur);
                ServiceFournisseur.ajouterContact(res.data.id_fournisseur , contacts[i].nomContact , contacts[i].numContact)
                .then((result)=>{
                        console.log(result.data);
                })
            }

                
        })
    }

    contact_ = (
                <>
                    {contacts.map((contact,key) => {
                return (
                    <div className='row gy-2 gx-2 align-items-left' key={key}>
                        <Contact nomContact={contact.nomContact} onNomContactChange={newnomContact => {
                            const newContacts = [...contacts]
                            newContacts[key].nomContact = newnomContact
                            setContacts(newContacts)
                        }}
                            numContact={contact.numContact} onNumContactChange = {newNumContact => {
                                const newContacts = [...contacts]
                                newContacts[key].numContact = newNumContact
                                setContacts(newContacts)
                            }}
                        />
                        <div className='col-sm-3'>
                        {key === 0 && <button className="btn btn-dark btn-outline-dark " type="button" id="button-addon2" onClick={() => {
                            
                            const newContacts = [...contacts]
                            
                            newContacts.push({
                                nomContact:'',
                                numContact:0,
                                date:new Date()
                            })
                            
                            setContacts(newContacts.sort((a,b) => {
                                if(a.date < b.date)
                                    return 1
                                if(a.date > b.date)
                                    return -1
                                return 0
                            }))
                            
                        }}>
                            <i className="bi bi-plus-lg" style={{color: "white"}}></i>
                        </button>}
                        </div>
                    </div>
                )
            })}
                </>
            )


    return ( 
        <>
            <div>
                <h1 id="titre" >Ajouter un fournisseur</h1>
                
                <section className="section" id="ajouterAgent">
                    <form className="needs-validation" name="formModify" novalidate>
                        <div className="mb-3 row">
                            <label for="nomAgent"  className="col-sm-2 col-form-label ">Nom Fournisseur</label>
                            <div className="col-sm-10">
                            <input  type="text"  className="form-control" id="nomAgent" value={nomFournisseur} onChange={(e)=> setNomFournisseur(e.target.value)}  required/>
                            </div>
                            
                        </div>

                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Activite</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="adresseAgent" value={activite} onChange={(e)=> setActivite(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="prenomAgent" className="col-sm-2 col-form-label " >Adresse fournisseur</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="prenomAgent" value={adresse} onChange={(e)=> setAdresse(e.target.value)} required/>
                            </div>
                        </div>


                        <div className="mb-3 row">
                            <label for="roleAgentAjout" className="col-sm-2 col-form-label">Forme juridique</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={formJuridique} onChange={(e)=> setFormJuridique(e.target.value)} required>
                                    <option selected></option>
                                    <option value="SARL">SARL</option>
                                    <option value="EURL">EURL</option>
                                </select>
                            </div>
                        </div>

                        

                        <div className="mb-3 row">
                            <label for="numAgent" className="col-sm-2 col-form-label ">Contact</label>
                            <div className="col-sm-10">
                                    {contact_}
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Email</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="adresseAgent" value={email} onChange={(e)=> setEmail(e.target.value)}  required/>
                            </div>
                        </div>
                        

                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Modalite de paiement</label>
                            <div className="col-sm-10">
                            
                                    <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={modalite} onChange={(e)=> setModalite(e.target.value)} required>
                                            <option selected></option>
                                            <option value="versement a l'avance">versement à l'avance</option>
                                            <option value="versement par tranche">versement par tranche</option>
                                            <option value="versement cash">versement cash</option>
                                    </select>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Type de paiement</label>
                            <div className="col-sm-10">
                            
                                    <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={typePaiement} onChange={(e)=> setTypePaiement(e.target.value)} required>
                                            <option selected></option>
                                            <option value="par cheque">par chèque</option>
                                            <option value="par espece">par espèce</option>
                                    </select>
                            </div>
                        </div>
                        


                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Nature de livraison</label>
                            <div className="col-sm-10">
                            <input type="text"  className="form-control" id="adresseAgent" value={natureLivraison} onChange={(e)=> setNaturelivraison(e.target.value)}  required/>
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                            <label for="adresseAgent" className="col-sm-2 col-form-label ">Categorie </label>
                            <div className="col-sm-10">
                                    <select className="form-select" aria-label="Default select example" id="roleAgentAjout" value={categorie} onChange={(e)=> setCategorie(e.target.value)} required>
                                            <option selected></option>
                                            <option value="fournisseur de poulet">Fournisseur de poulet</option>
                                            <option value="fournisseur des legumes">Fournisseur des legumes</option>
                                    </select>
                            </div>
                        </div>
                        
                        
                          
                        

                    </form>
                    <div className="d-grid gap-2 my-4">
                        <button className="btn1" type="submit" id="ajouterbtn" onClick={fonctionAjouter} >AJOUTER</button>
                    </div>
                </section>
    
            </div>
        </>
     )
}
 
export default AjouterFournisseur;