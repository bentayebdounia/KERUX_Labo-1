import React ,{useState,useEffect} from 'react'
import { Link, useHistory , useLocation} from 'react-router-dom'

import AjouterEntrepot from '../entrepot/ajouterEntrepot'
import Etape from '../etapeMenu/component.etap'
import JournalNettoyage from '../journalProcess/journalNettoyage'
import JournalReception from '../journalProcess/journalRecetion'
import JournalProduitsFournis from '../journalProcess/journalProduitFourni'
import MouvementStock from '../Stock/mouvementStock'
import AcueilBoutton from '../acueil_boutton'
import StatistiqueProduitFourni from '../statistique/statistiqueProduitFourni'



const Navbar = () => {
    
   const [process , setProcess] = useState(false)

    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

    const [showJournalNettoyage, setShowJournalNettoyage] = useState(false)
    const handleCloseJournalNettoyage = () => setShowJournalNettoyage(false)
    const handleShowJournalNettoyage = () => setShowJournalNettoyage(true)

    const [showJournalReception, setShowJournalReception] = useState(false)
    const handleCloseJournalReception = () => setShowJournalReception(false)
    const handleShowJournalReception = () => setShowJournalReception(true)

    const [showJournalProduitFourni, setShowJournalProduitFournit] = useState(false)
    const handleCloseJournalRProduitFourni = () => setShowJournalProduitFournit(false)
    const handleShowJournalProduitFourni = () => setShowJournalProduitFournit(true)

    const [showMouvementStock, setShowMouvementStockt] = useState(false)
    const handleCloseMouvementStock = () => setShowMouvementStockt(false)
    const handleShowMouvementStock = () => setShowMouvementStockt(true)

    const [showProcess, setShowprocess] = useState(false)
    const handleCloseProcess = () => setShowprocess(false)
    const handleShowProcess = () => setShowprocess(true)

    const [showAcueil, setShowacueil] = useState(false)
    const handleCloseAcueil = () => setShowacueil(false)
    const handleShowAcueil = () => setShowacueil(true)

    const [journalprocess, setJournalProcess ] = useState('')

    const [entrepot, setEntrepot] = useState()
    const location = useLocation();

    const [showStatistiqueProd, setShowstatistique_prod] = useState(false)
    const handleCloseStatistiqueProd = () => setShowstatistique_prod(false)
    const handleShowStatistiqueProd = () => setShowstatistique_prod(true)
  let etape

  

   
    
    

    return (
        <div>
          <nav className="navbar   fixed-top flex-md-nowrap p-0 shadow" style={{background: "#7B170F"}}>
            <div className="container-fluid" id='divContainer'>
          
          <Link className="nav-link active me-auto mx-3" style={{color: "white" , fontSize: "13px" }} aria-current="page" to="#"  >
            <i className="bi bi-house-door-fill" style={{fontSize: "1rem" ,color:"white"}}></i>
            Acueil
          </Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  aria-current="page" to="#" onClick={handleShowProcess}>Process</Link>
          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">
            <i className="bi bi-journals" style={{fontSize: "1rem", color:"white"}}></i>
            Journal
          </Link>
          <ul className="dropdown-menu" style={{marginLeft:'40%'}}>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalReception() } } >Journal de reception</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalProduitFourni() } } >Journal de produits fournis</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('enregistrement') } }>Journal de enregistrement</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('nettoyage') } } >Journal de nettoyage</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('coupage') } }>Journal de coupage</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('conditionnement') } }>Journal de conditionnement</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('marinade') } }>Journal de marinade</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('sortie') } }>Journal de sortie</button> </li>
            
          </ul>

          <Link className="nav-link active me-auto mx-3" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color: "white", fontSize: "13px"}}   href="#">
              Stock   
          </Link>
          <ul className="dropdown-menu" style={{marginLeft:'60%'}}>
            <li> <button className="dropdown-item"  type="button" onClick={handleShow4}>Entrepot</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={handleShowMouvementStock}>Movement de stock</button> </li>
            
          </ul>


          <Link className="nav-link active me-auto mx-3" style={{color: "white", fontSize: "13px"}}  role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">Statistique</Link>
          <ul className="dropdown-menu" style={{marginLeft:'77%'}}>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowStatistiqueProd() } } >Statistique des produits </button> </li>
            <li> <button className="dropdown-item"  type="button"  >Statistique des process  </button> </li>
            <li> <button className="dropdown-item"  type="button" >Statistique des stock </button> </li>
            
          </ul>
        
          <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-fill" style={{fontSize: "1.25rem", color:"white"}}></i>
            <i className="bi bi-chevron-down" style={{fontSize: "0.5rem", color:"white"}}></i>
          </Link>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span className="spanUser">MAHMOIDI Amin</span> 
              <br/>
              <span className="spanID">4 </span> 
              <br/>
              <span className="spanRole">admin</span> 
           </li>
            <li><Link className="dropdown-item" to='login'>Déconnecter</Link></li>
          </ul>
          
            </div>
        </nav>
        {showProcess && <Etape/>}
        {showAcueil && <AcueilBoutton/> }

        {show4 && <AjouterEntrepot 
                            show={show4} 
                            handleClose={handleClose4} 
                            handleShow={handleShow4}
                            
                            
                          />}

          {showJournalNettoyage &&  <JournalNettoyage   show = {showJournalNettoyage}
                                                handleClose={handleCloseJournalNettoyage} 
                                                handleShow={handleShowJournalNettoyage}
                                                journalprocess={journalprocess}
          
                                          />}

          {showJournalReception &&  <JournalReception   show = {showJournalReception}
                                                handleClose={handleCloseJournalReception} 
                                                handleShow={handleShowJournalReception}
                                                
                                      
                                          />}
          {showJournalProduitFourni &&  <JournalProduitsFournis   show = {showJournalProduitFourni}
                                                handleClose={handleCloseJournalRProduitFourni} 
                                                
                                                
                                      
                                          />}

          {showMouvementStock &&  <MouvementStock
                                                        show = {showMouvementStock}
                                                        handleClose={handleCloseMouvementStock} 
                                                        

                                          />}
                                  
          {showStatistiqueProd && <StatistiqueProduitFourni
                                          show={showStatistiqueProd}
                                          handleClose={handleCloseStatistiqueProd}
                  />}
        
        </div>
    
    )
}

export default Navbar 