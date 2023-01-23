import React ,{useState,useEffect} from 'react'
import Box from './box'
import "./appp.css"
import TESTPRINT from './testPrint'
var Barcode = require('react-barcode')
var jsThermalPrinter = require("js-thermal-printer")
const ThermalPrinter = require("../../node-thermal-printer").printer;
const PrinterTypes = require("../../node-thermal-printer").types;

function Appp(){
    

    //const [users,setUsers] = useState([])

    //const [editMode,setEditMode] = useState(-1)

    const [boxes,setBoxes] = useState([{
        product:'',
        weight:0,
        number:0,
        date:new Date()
    }])

//how to print config a printer in react js?    

    const printThermal = () => {
        let printer = new ThermalPrinter({
            type: PrinterTypes.STAR,                                  // Printer type: 'star' or 'epson'
            interface: 'tcp://http://192.168.1.63:80',                       // Printer interface
            characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,                           // Removes special characters - default: false
            lineCharacter: "=",                                       // Set character for lines - default: "-"
            options:{                                                 // Additional options
              timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
            }
          });
          
            let isConnected =  printer.isPrinterConnected();       // Check if printer is connected, return bool of status
            let execute =  printer.execute();                      // Executes all the commands. Returns success or throws error
            let raw =  printer.raw(Buffer.from("Hello world"));    // Print instantly. Returns success or throws error
            printer.print("Hello World");                               // Append text
            printer.println("Hello World"); 
        

    }
console.log(boxes);

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