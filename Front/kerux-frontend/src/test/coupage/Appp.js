import React ,{useState,useEffect} from 'react'
import Box from './box'
import "./appp.css"
import TESTPRINT from './testPrint'




function Appp(){
    

    //const [users,setUsers] = useState([])

    //const [editMode,setEditMode] = useState(-1)

  

//how to print in electron js? 

    const printThermal =  () => {
        
       
       
        

    }
//console.log(boxes);

const print =() => {
    window.print()
}
    return (
        <>
                
                    <button id="btnPrint" className="hidden-print" onClick={ printThermal }>Print</button>

                  

        </>
    )
}
export default Appp;