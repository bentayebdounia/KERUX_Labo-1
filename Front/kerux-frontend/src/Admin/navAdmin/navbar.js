import React ,{useState} from 'react'
import { Link} from 'react-router-dom'
import ModifierAlert from '../modifierAlert/modifierAlert'

import './navbar.css'

const Navbar = () => {
  
    var user = JSON.parse (localStorage.getItem('login'))
    const [Modifieralert , setModifieralert] = useState(false)
    const ShowModifierAlert = () => setModifieralert(true)
    const DisplayModifierAlert = () => setModifieralert(false)

 
    return (
        <div>
          <nav className="navbar fixed-top flex-md-nowrap p-0 shadow" >
            <div className="container-fluid" id='divContainer'>
          
              <Link className="nav-link active  me-5"  to='/test'  >
                <i className="bi bi-door-open-fill me-2" ></i>
                Passer au mode agent
              </Link>

              <Link className="nav-link active "  to='#'   onClick={ShowModifierAlert}>
                <i className="bell bi bi-bell-fill me-2" ></i>
                Modifier les alertes
              </Link>
              
            
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

          
        
        </div>
    
    )
}

export default Navbar 