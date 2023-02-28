import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import AjouterAgent from '../agent/ajouterAgent'
import ListeAgent from '../agent/listeAgent'
import AjouterFournisseur from '../fournisseur/ajouterfournisseur'
import ListFournisseur from '../fournisseur/listeFournisseur'
import AjouterProduit from '../produit/ajouterProduit'
import ListProduit from '../produit/listeProduit'
import './sideBar.css'


const Sidebar= () => {
    const [controle, setControle] = useState(false)

    const [toggleAgentBar, setToggleagentbar] = useState(false)
    const AffichAgentBar = () => setToggleagentbar(!toggleAgentBar)

    const [toggleFournisseurBar, setTogglefournisseurbar] = useState(false)
    const AffichFournisseurBar = () => setTogglefournisseurbar(!toggleFournisseurBar)

    const [toggleProduitBar, setToggleproduitbar] = useState(false)
    const AffichProduitBar = () => setToggleproduitbar(!toggleProduitBar)

    const [controleAjout, setControleAjout] = useState(false)
    const [controleModif, setControleModif] = useState(false)
    const [controleList, setControleList] = useState(false)
    const [controlePassword, setControlePassword] = useState(false)

    const [toggleAjoutFourni , setToggleAjoutfourni ]  = useState (false)
    const toggleshowAjoutFourni = () => setToggleAjoutfourni(true)
    const toggleDisplayAjoutFourni = () => setToggleAjoutfourni (false)

    const [togglelistFourni , setTogglelistfourni ]  = useState (false)
    const toggleshowListFourni = () => setTogglelistfourni(true)
    const toggleDisplayListFourni = () => setTogglelistfourni (false)

    const [toggleAjoutProduit , setToggle_ajoutproduit ]  = useState (false)
    const toggleshowAjoutProduit = () => setToggle_ajoutproduit(true)
    const toggleDisplayAjoutProduit = () => setToggle_ajoutproduit (false)

    const [toggleListProduit , setToggle_listproduit ]  = useState (false)
    const toggleshowListProduit = () => setToggle_listproduit(true)
    const toggleDisplayListProduit = () => setToggle_listproduit (false)
    //masquer ou afficher la section d'ajout
    const ajouter=() => {
        setControleAjout(true)
        setControleModif(false)
        setControleList(false)
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()      
    }
    const modifier =  () => {
        setControleAjout(false)
        setControleModif(true)
        setControleList(false)
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit() 
        

        
    }
    const liste =  () => {
        setControleAjout(false)
        setControleModif(false)
        setControleList(true)
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleDisplayListProduit()

        
    }

    const fournisseurAjout= () => {
         setControleAjout(false)
          setControleModif(false)
          setControleList(false)
          toggleshowAjoutFourni()
          toggleDisplayListFourni()
          toggleDisplayAjoutProduit() 
          toggleDisplayListProduit()
      }
      const fournisseurList= () => {
        setControleAjout(false)
          setControleModif(false)
          setControleList(false)
          toggleDisplayAjoutFourni()
          toggleshowListFourni()
          toggleDisplayAjoutProduit() 
          toggleDisplayListProduit()
      }
  
      
  
      const produitAjout= () => {
            setControleAjout(false)
            setControleModif(false)
            setControleList(false)
            toggleDisplayAjoutFourni()
            toggleDisplayListFourni()
            toggleshowAjoutProduit() 
            toggleDisplayListProduit()
  
      }
  
      const produitList= () => {
        setControleAjout(false)
        setControleModif(false)
        setControleList(false)
        toggleDisplayAjoutFourni()
        toggleDisplayListFourni()
        toggleDisplayAjoutProduit() 
        toggleshowListProduit()
        
  }
  
    
    
    return(
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 py-5 bg-light d-none d-md-block sidebar">
                        <div className="left-sidebar">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to={'#'}  className="nav-link active mb-2" aria-current="page" style={{color: "unset" , fontWeight:"bold" , fontSize:"22px"}}
                                            onClick={AffichAgentBar} >
                                            {!toggleAgentBar && <i className="bi bi-caret-right-fill" style={{color: 'black'}}></i>}
                                            {toggleAgentBar && <i className="bi bi-caret-down-fill" style={{color: 'black'}}></i>} 
                                            Agent
                                    </Link>
                                    {toggleAgentBar &&<>
                                                            <ol>
                                                            <Link to={'#'} className="nav-link mb-2" aria-current="page" onClick={ajouter} >
                                                                <i className="bi bi-person-plus-fill me-2" style={{color: 'black' }}></i>
                                                                Ajouter un agent
                                                            </Link>
                                                            
                                                            </ol>
                                                            
                                                            <ol>
                                                            <Link to={'#'} className="nav-link mb-3" onClick={liste} >
                                                                <i className="bi bi-person-lines-fill me-2" style={{color: 'black' }}></i>
                                                                Liste des agent
                                                            </Link>
                                                            </ol>
                                                        </>}
                                </li>
                                
                                <li className="nav-item">
                                    <Link to={'#'} className="nav-link mb-2" style={{color: "unset" , fontWeight:"bold" , fontSize:"22px"}}
                                        onClick={AffichFournisseurBar} >
                                            {!toggleFournisseurBar && <i className="bi bi-caret-right-fill" style={{color: 'black'}}></i>}
                                            {toggleFournisseurBar && <i className="bi bi-caret-down-fill" style={{color: 'black'}}></i>}
                                        Fournisseur
                                    </Link>
                                    { toggleFournisseurBar &&
                                        <>
                                        <ol>
                                        <Link to={'#'} className="nav-link mb-2" onClick={fournisseurAjout}>
                                            <i className="bi bi-person-plus-fill me-2" style={{color: 'black' }}></i>
                                            Ajouter fournisseur
                                        </Link>
                                        </ol>
                            
                                        <ol>
                                        <Link to={'#'} className="nav-link mb-3"  onClick={fournisseurList}>
                                            <i className="bi bi-person-lines-fill me-2" style={{color: 'black' }}></i>
                                            Liste des fournisseurs
                                        </Link>
                                        </ol>
                                    </>
                                    }
                                </li>

                                <li className="nav-item">
                                    <Link to={'#'} className="nav-link mb-2" style={{color: "unset" , fontWeight:"bold" , fontSize:"22px"}} 
                                        onClick={AffichProduitBar} >
                                            {!toggleProduitBar && <i className="bi bi-caret-right-fill" style={{color: 'black'}}></i>}
                                            {toggleProduitBar && <i className="bi bi-caret-down-fill" style={{color: 'black'}}></i>}
                                        Produit
                                    </Link>
                                    { toggleProduitBar &&
                                    
                                        <>
                                        <ol>
                                        <Link to={'#'} className="nav-link mb-2" onClick={produitAjout}>
                                            <i className="bi bi-patch-plus-fill me-2" style={{color: 'black' }}></i>
                                            Ajouter produit
                                        </Link>
                                        </ol>
                                        
                                        <ol>
                                        <Link to={'#'} className="nav-link" onClick={produitList} >
                                            <i className="bi bi-pass-fill me-2" style={{color: 'black' }}></i>
                                            Liste des produits
                                        </Link>
                                        </ol>
                                        </>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
        
                </div>
            </div>

            <main role="main" className="col-md-10 ml-sm-auto col-lg-10">
                <div className="containerMain" style={{width:"80%", marginLeft:"10%"}}>
                    {controleAjout && <AjouterAgent/>}
                    {controleList && <ListeAgent/>}
                    {toggleAjoutFourni && <AjouterFournisseur/>}
                    {togglelistFourni && <ListFournisseur/>}
                    {toggleAjoutProduit && <AjouterProduit/>}
                    {toggleListProduit && <ListProduit/>}
                    
                </div>
            </main>
        </div>
    )
}
export default Sidebar