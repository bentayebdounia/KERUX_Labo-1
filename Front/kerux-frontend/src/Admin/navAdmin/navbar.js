import React  from 'react'
import { Link} from 'react-router-dom'

import './navbar.css'

const Navbar = () => {
 
    return (
        <div>
          <nav className="navbar fixed-top flex-md-nowrap p-0 shadow" >
            <div className="container-fluid" id='divContainer'>
          
          <Link className="nav-link active"   to={{pathname:"/test"}}  >
            <i className="bi bi-door-open-fill" ></i>
            Passer au mode agent
          </Link>
          
          

          


          
        
          <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-fill" style={{fontSize: "1.25rem", color:"white"}}></i>
            <i className="bi bi-caret-down-fill" style={{fontSize: "0.5rem", color:"white"}}></i>
          </Link>
          <ul className="dropdown-menu menubar" style={{marginLeft:"70%"}}>
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
        

          
        
        </div>
    
    )
}

export default Navbar 