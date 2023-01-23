import React ,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../bootstrap-icons-1.9.1/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar/navbar'
import Etape from './etapeMenu/component.etap'



const AcueilProcess = () => {

 
    return(
        <div>
            <div className='row'><div className='col'><Navbar/></div></div>
            <div className='row'><div className='col' style={{marginTop:"4%"}}><Etape/></div></div>
            
            
            
        </div>
        
    )
}
export default AcueilProcess