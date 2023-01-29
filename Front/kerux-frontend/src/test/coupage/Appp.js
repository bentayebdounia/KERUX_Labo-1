import React ,{useRef, useState, useEffect} from 'react'
import JsBarcode from 'jsbarcode'
//import {print} from 'electron-printer'
const fs = require('fs')




function Appp(){
    
/*
    //const [users,setUsers] = useState([])

    //const [editMode,setEditMode] = useState(-1)
    const barcodeRef = useRef(null)
    const [barcodeData, setBarcodedata] = useState('1234567890')
    useEffect( () =>{
        JsBarcode(barcodeRef.current, barcodeData, {
            format: "code128",
            displayValue: true,
            fontSize: 20
        })
    }, [barcodeData])
  
    const handlePrint = async () => {
        const imgData = barcodeRef.current.childNodes[0].toDataURL()
        const options = {
            silent: true,
            printBackground: true,
            deviceName: 'My Printer'
        }
        print(imgData, options)
    }

    
/*
const print =() => {
    window.print()
}*/
/*
    return (
        <div>
                <div ref={barcodeRef}></div>
                
                    <button id="btnPrint" className="hidden-print" onClick={ handlePrint }>Imprimer</button>

                  

        </div>
    )
    */
}
export default Appp;