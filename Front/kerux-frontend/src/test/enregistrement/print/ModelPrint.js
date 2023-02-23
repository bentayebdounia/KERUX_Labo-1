import React ,{useState,useEffect} from 'react'

import './modelPrint.css'
var Barcode = require('react-barcode')

function TESTPRINT(props){
 console.log(props.id);
 
    return (
      <>
        <div className="ticket">
          <div className="row">
            <span className="col-6">
              <span style={{ fontWeight: "bold" }}>Poids: </span>{" "}
              {parseFloat(props.poids) / 1000}Kg{" "}
            </span>
            <span className="col-6">
              <span style={{ fontWeight: "bold" }}>Qantite: </span>{" "}
              {props.nombre !== null && props.nombre !== 0 && props.nombre}{" "}
            </span>
            <span className="col-6">
              <span style={{ fontWeight: "bold" }}>Categorie: </span>
              {props.categorie}{" "}
            </span>
            <span className="col-6">
              <span style={{ fontWeight: "bold" }}>Produit: </span>
              {props.produit}{" "}
            </span>
            <span className="col-10">
              {" "}
              <Barcode
                value={props.id}
                width={1}
                height={60}
                fontSize={13}
              />{" "}
            </span>
          </div>
        </div>
      </>
    );
}
export default TESTPRINT;