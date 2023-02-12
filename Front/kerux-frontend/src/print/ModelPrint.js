import React ,{useState,useEffect} from 'react'

import './modelPrint.css'
var Barcode = require('react-barcode')

function TESTPRINT(props){
 console.log(props.id);
    return (
        <>
        
            <div className="ticket">
                        <div className='row'>
                        <span className='col-6'><span style={{fontWeight:'bold'}}>Poids: </span> {parseFloat( props.poids)/1000}Kg </span>
                        <span className='col-6'><span style={{fontWeight:'bold'}}>Qantite: </span> {props.nombre} </span>
                        <span className='col-10'><span style={{fontWeight:'bold'}}>Description: </span>{props.categorie} </span>
                        </div>
                        <tr style={{textAlign: 'center'}}> <Barcode  value={props.id}  width= {1} fontSize= {12} /> </tr>              
            </div>    

        </>
    )
}
export default TESTPRINT;