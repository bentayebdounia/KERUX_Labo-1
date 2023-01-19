import React ,{useState,useEffect} from 'react'

import './modelPrint.css'
var Barcode = require('react-barcode')

function TESTPRINT(props){
 console.log(props.id);
    return (
        <>
        
            <div className="ticket">
                 
                        <li>Poids: {props.poids} </li>
                        <li>Nombre: {props.nombre} </li>
                        <li>Description: {props.categorie} </li>
                        <tr> <Barcode  value={props.id.id_gnerate}  width= {1} fontSize= {12} /> </tr>              
            </div>    

        </>
    )
}
export default TESTPRINT;