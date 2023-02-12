import React, {forwardRef} from "react";
import TESTPRINT from "../../print/ModelPrint";
import "./appp.css";

export const Bill = forwardRef((props, ref) => (
    <div style={{height: "45mm", width: "55mm"}} ref={ref}>
      <TESTPRINT id= {props.id} poids= {props.poids} nombre= {props.nombre} categorie={props.categorie} />
    </div>
));
