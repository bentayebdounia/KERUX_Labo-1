import React ,{useState} from 'react'
import { Link} from 'react-router-dom'
import AjouterEntrepot from '../entrepot/ajouterEntrepot'
import ModifierAlert from '../alert/modifierAlert'

import './navbar.css'
import ListeAlerte from '../alert/listeAlertes'
import ListeEntrepot from '../entrepot/listeEntrepot'

const Navbar = () => {
  
    var user = JSON.parse (localStorage.getItem('login'))
    const [Modifieralert , setModifieralert] = useState(false)
    const ShowModifierAlert = () => setModifieralert(true)
    const DisplayModifierAlert = () => setModifieralert(false)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const [show3, setShow3] = useState(false)
    const handleClose3 = () => setShow3(false)
    const handleShow3 = () => setShow3(true)

    const [show4, setShow4] = useState(false)
    const handleClose4 = () => setShow4(false)
    const handleShow4 = () => setShow4(true)

 
    return (
        <div>
          <nav className="navbar fixed-top flex-md-nowrap p-0 shadow" >
            <div className="container-fluid" id='divContainer'>
          
              <Link className="nav-link active  me-5"  to='/test'  >
                <i className="bi bi-door-open-fill me-2" ></i>
                Mode agent
              </Link>

              <Link className="nav-link active "  to='#' role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"3%"}}  >
                <i className="bell bi bi-bell-fill me-2" ></i>
                Alertes
              </Link>
              <ul className="dropdown-menu menubar" style={{marginLeft:"34%"}}>
                <li> <button className="dropdown-item"  type="button"  onClick={ShowModifierAlert}>Modifier alerte</button> </li>
                <li> <button className="dropdown-item"  type="button" onClick={handleShow3} >Liste des aletes</button> </li>
              </ul>

              <Link className="nav-link active "  to='#' role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"3%"}}  >
                <i className="bi bi-house-fill me-2" ></i>
                Entrepot
              </Link>
              <ul className="dropdown-menu menubar" style={{marginLeft:"40%"}}>
                <li> <button className="dropdown-item"  type="button"  onClick={handleShow4}>Ajouter un entrepot</button> </li>
                <li> <button className="dropdown-item"  type="button" onClick={handleShow2} >Liste des entrepots</button> </li>
              </ul>
              
            
              <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"35%"}}>
                <i className="bi bi-person-fill" style={{fontSize: "1.25rem", color:"white"}}></i>
                <i className="bi bi-caret-down-fill" style={{fontSize: "0.5rem", color:"white"}}></i>
              </Link>
              
              <ul className="dropdown-menu menubar" style={{marginLeft:"70%"}}>
                <li>
                  <span className="spanUser">{user.nom}</span> 
                  <br/>
                  <span className="spanID">{user.id }</span> 
                  <br/>
                  <span className="spanRole">{user.role}</span> 
              </li>
                <li><Link className="dropdown-item" to='login' onClick={()=>{ localStorage.removeItem('login')}}>Déconnecter</Link></li>
              </ul>
          
            </div>
        </nav>
        
        {
          Modifieralert && <ModifierAlert show = {ShowModifierAlert} 
                                          handleClose={DisplayModifierAlert} 
                                          
                            />
        }
        {show3 && <ListeAlerte 
                            show={show3} 
                            handleClose={handleClose3} 
                            handleShow={handleShow3}
                            
                            
                          />}

        {show4 && <AjouterEntrepot 
                            show={show4} 
                            handleClose={handleClose4} 
                            handleShow={handleShow4}
                            
                            
                          />}

        {show2 && <ListeEntrepot 
                            show={show2} 
                            handleClose={handleClose2} 
                            handleShow={handleShow2}
                            
                            
                          />}
          
        
        </div>
    
    )
}

export default Navbar 