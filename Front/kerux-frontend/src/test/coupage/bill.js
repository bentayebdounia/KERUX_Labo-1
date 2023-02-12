import React, {forwardRef} from "react";
import TESTPRINT from "../../print/ModelPrint";
import "./appp.css";

export const Bill = forwardRef((props, ref) => (
    <div style={{height: "45px", width: "55px"}} ref={ref}>
      <TESTPRINT id= {'00140300423LL1'} poids= {'25kg'} nombre= {'10'} categorie={'poulet'} />
    </div>
));

