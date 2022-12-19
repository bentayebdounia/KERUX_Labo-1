import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './acueil.css'


const Sidebar= () => {
    const [controle, setControle] = useState(false)
    
    const ajouter=() => {
        setControle(!controle)
        console.log(controle)
        if(controle) return console       
    }
    return(
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2 py-5 bg-light d-none d-md-block sidebar">
                    <div class="left-sidebar">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                 <Link to={'#'} class="nav-link active" aria-current="page"  onClick={ajouter}>Ajouter un agent</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'#'} class="nav-link"  >Modifier un agent</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'#'} class="nav-link"  >Liste des agents</Link>
                            </li>
                        </ul>
                    </div>
                </div>
    
            </div>
        </div>
    )
}
export default Sidebar