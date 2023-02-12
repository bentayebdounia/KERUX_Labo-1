import React, {createRef} from "react";
import {useReactToPrint} from "react-to-print";
import { Bill } from "./bill";
import "./appp.css";

const MyComponent = () => {
  const billRef = createRef();
  const chartRef = createRef();

  // Send print request to the Main process
  const handlePrint = function (target) {
    return new Promise(() => {
      console.log("forwarding print request to the main process...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      //console.log(data);
      const blob = new Blob([data], {type: "text/html"});
      const url = URL.createObjectURL(blob);

      window.electronAPI.printComponent(url, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };

  const handleBillPrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: "Bill component",
    print: handlePrint,
  });
  

  return (
    <div className="App">
        
        <div style={{height: "45px", width: "55px"}}>
          <hr/>
          <br/>
          <span>
            <button
                onClick={handleBillPrint}
                style={{marginLeft: "1rem"}}>Print </button>
            
          </span>
          <div style={{display:"none"}}>
            <Bill ref={billRef}/>
          </div>
          
          <hr/>
          <br/>

          
        </div>
      </div>
  );
};

export default MyComponent;