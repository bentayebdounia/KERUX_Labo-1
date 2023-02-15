import React, {forwardRef} from "react";
import TESTPRINT from "../../print/ModelPrint";
import "./appp.css";

export const Bill = forwardRef((props, ref) => (
    <div style={{height: "45mm", width: "55mm"}} ref={ref}>

      <TESTPRINT  id= {props.id.id_gnerate} 
                  poids= {props.id.poids}    
                  nombre= {props.id.nombre} 
                  categorie={props.categorie} 
                  />

    </div>
));

// console.log("p= "+props.poids);
//  console.log("n= "+props.nombre);