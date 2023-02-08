import React from 'react'
//import Box from './box'

var Barcode = require('react-barcode')

function Appp(){

  const handlePrint = () => {
    
    window.print()
  };

    return (
        <>

              <div>
                  <Barcode value="014193LT05"  width= {1}  flat={ true}/>
              </div>
              <button onClick={handlePrint}>Print Page</button>



        </>
    )
}
export default Appp;