import React ,{useState,useEffect} from 'react'
import { Link, useHistory , useLocation} from 'react-router-dom'

import AjouterEntrepot from '../entrepot/ajouterEntrepot'
import Etape from '../etapeMenu/component.etap'
import JournalNettoyage from '../journalProcess/journalNettoyage'
import JournalReception from '../journalProcess/journalRecetion'
import JournalProduitsFournis from '../journalProcess/journalProduitFourni'
import MouvementStock from '../Stock/mouvementStock'
import AcueilBoutton from '../acueil_boutton'
import StatistiqueProduitFourni from '../statistique/MstatistiqueProduitFourni'
import StatistiqueTypeProduit from '../statistique/MstatistiqueType'
import StatistiqueProcess from '../statistique/MstatistiqueProcessProd'

import './navbar.css'

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

    const [showStatistiqueProdType, setShowstatistique_prodtype] = useState(false)
    const handleCloseStatistiqueProdType = () => setShowstatistique_prodtype(false)
    const handleShowStatistiqueProdType = () => setShowstatistique_prodtype(true)

    const [showStatProcessProd, setShowstatprocess_prod] = useState(false)
    const handleCloseStatProcessProd = () => setShowstatprocess_prod(false)
    const handleShowStatProcessProd = () => setShowstatprocess_prod(true)


  

   
    
    

    return (
        <div>
          <nav className="navbar fixed-top flex-md-nowrap p-0 shadow" >
            <div className="container-fluid" id='divContainer'>
          
          <Link className="nav-link active"   to="#"  >
            <i className="bi bi-house-door-fill me-2" ></i>
            Acueil
          </Link>
          <Link className="nav-link active"  to="#" onClick={handleShowProcess}>
          <i className="bi bi-bar-chart-steps me-2" ></i>
            Process</Link>
          <Link className="nav-link active "   role="button" data-bs-toggle="dropdown"  to="#">
            <i className="bi bi-journals me-2" ></i>
            Journal
          </Link>
          <ul className="dropdown-menu menubar" style={{marginLeft:'39.5%'}}>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalReception() } } >Journal de reception</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalProduitFourni() } } >Journal de produits fournis</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('enregistrement') } }>Journal de enregistrement</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('nettoyage') } } >Journal de nettoyage</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('coupage') } }>Journal de coupage</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('conditionnement') } }>Journal de conditionnement</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('marinade') } }>Journal de marinade</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowJournalNettoyage(); setJournalProcess('sortie') } }>Journal de sortie</button> </li>
            
          </ul>

          <Link className="nav-link active" role="button" data-bs-toggle="dropdown" aria-expanded="false"  href="#">
          <i className="bi bi-boxes me-2" ></i>
              Stock   
          </Link>
          <ul className="dropdown-menu menubar" style={{marginLeft:'55%'}}>
            <li> <button className="dropdown-item"  type="button" onClick={handleShow4}>Entrepot</button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={handleShowMouvementStock}>Movement de stock</button> </li>
            
          </ul>


          <Link className="nav-link active" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">
          <i className="bi bi-bar-chart-line-fill me-2" ></i>
          Statistique
            </Link>
          <ul className="dropdown-menu menubar" style={{marginLeft:'69.5%'}}>
            <li> <button className="dropdown-item"  type="button" onClick={()=>{ handleShowStatistiqueProd() } } >Statistique des categories produits </button> </li>
            <li> <button className="dropdown-item"  type="button"  onClick={()=> { handleShowStatistiqueProdType ()}}>Statistique des types produits  </button> </li>
            <li> <button className="dropdown-item"  type="button" onClick={()=> { handleShowStatProcessProd ()}}>Statistique des process </button> </li>
            
          </ul>
        
          <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-fill" style={{fontSize: "1.25rem", color:"white"}}></i>
            <i className="bi bi-caret-down-fill" style={{fontSize: "0.5rem", color:"white"}}></i>
          </Link>
          <ul className="dropdown-menu menubar" style={{marginLeft:'87%'}}>
            <li>
              <span className="spanUser">BENTAYEB Dounia</span> 
              <br/>
              <span className="spanID">97 </span> 
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

          {showStatistiqueProdType && <StatistiqueTypeProduit
                                                    show={showStatistiqueProdType}
                                                    handleClose={handleCloseStatistiqueProdType}
                            />}
          {showStatProcessProd && <StatistiqueProcess
                                                    show={showStatProcessProd}
                                                    handleClose={handleCloseStatProcessProd}
                            />}
        
        </div>
    
    )
}

export default Navbar 