import React ,{useState,useEffect} from 'react'


var Barcode = require('react-barcode')

function TESTPRINT(){
    


    return (
        <>

            <div className="ticket">
                    
                        
                        

                        <li>Poids: 20Kg </li>
                        <li>Nombre: 0 </li>
                        <li>Description: Legume </li>
                        <tr> <Barcode  value="014008193LT05"  width= {1}  flat={true}/> </tr>
                        
                                    
                                
                        
                        
                    </div>
                   

                  

        </>
    )
}
export default TESTPRINT;