import React ,{useState,useEffect} from 'react'

import './modelPrint.css'
var Barcode = require('react-barcode')

function TESTPRINT(props){
 //console.log(props.id);
 
    return (
      <>
        <div className="ticket">
          <div className="row">
            <span className="col-6">
              <span>Poids: </span> {parseFloat(props.poids) / 1000}Kg{"   "}
              <span style={{ marginLeft: "5px" }}>Q: </span>{" "}
              {props.nombre !== null && props.nombre !== 0 && props.nombre}
            </span>
            <span className="col-6">
              <span>Cat: </span>
              {props.categorie}
            </span>
            <span className="col-6">
              <span>Prod: </span>
              {props.produit}
            </span>
            {props.entrepot !== "" && (
              <span className="col-6">
                <span>stock: </span>
                {props.entrepot}
              </span>
            )}
            <span className="col-10">
              {" "}
              <Barcode
                value={props.id}
                width={1}
                height={60}
                fontSize={12}
              />{" "}
            </span>
          </div>
        </div>
      </>
    );
}
export default TESTPRINT;