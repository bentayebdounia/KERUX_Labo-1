import { useState } from "react"

export default function Contact(props){
    
   

    return (
      <>
        <label
          className="col-sm-2 col-form-label "
          for="produit"
          style={{ color: "#000", fontWeight: "bold" }}
        >
          Nom de contact
        </label>
        <div className="col-sm-3">
          {props.cle === 0 && (
            <input
              type="text"
              class="form-control"
              id="produit"
              style={{ height: "50px" }}
              value={props.nomContact}
              onChange={(event) => {
                props.onNomContactChange(event.target.value);
              }}
            />
          )}

          {props.cle > 0 && (
            <input
              type="text"
              class="form-control"
              id="produit"
              style={{ height: "50px" }}
              value={props.nomContact}
            />
          )}
        </div>

        <label
          className="col-sm-1 col-form-label  "
          for="poids"
          style={{ paddingLeft: "3%", color: "#000", fontWeight: "bold" }}
        >
          Tel
        </label>
        <div className="col-sm-3">
          {props.cle === 0 && (
            <>
              <input
                type="text"
                class="form-control"
                id="poids"
                style={{ height: "50px" }}
                value={props.numContact}
                onChange={(event) => {
                  props.onNumContactChange(event.target.value);
                }}
              />
              {(props.numContact).length > 10 && (
                <p style={{ color: "red", fontSize: "11px" }}>
                  {" "}
                  * Numero de telephone incorrect{" "}
                </p>
              )}
            </>
          )}

          {props.cle > 0 && (
            <input
              type="text"
              class="form-control"
              id="poids"
              style={{ height: "50px" }}
              value={props.numContact}
            />
          )}
        </div>
      </>
    );
}