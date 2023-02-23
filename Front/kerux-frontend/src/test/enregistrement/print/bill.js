import React, {forwardRef} from "react";
import TESTPRINT from "./ModelPrint";


export const Bill = forwardRef((props, ref) => (
  <div style={{ height: "40mm", width: "55mm" }} ref={ref}>
    <TESTPRINT
      id={props.id.id_gnerate}
      poids={props.id.poids}
      nombre={props.id.nombre}
      categorie={props.id.categorie}
      produit={props.id.produit}
    />
  </div>
));

// console.log("p= "+props.poids);
//  console.log("n= "+props.nombre);