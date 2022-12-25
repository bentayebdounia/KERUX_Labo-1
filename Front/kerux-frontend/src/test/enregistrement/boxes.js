import { useState } from "react"

export default function Boxes(props){

    

    return (
        <>
            
            <div className="row gy-2 gx-2 align-items-left">
                
                  <div className=" col-12 ">
                   <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Type de produit: </label>
                    <label for="produit" style={{color:"#000"}} > {props.n_produit} </label>
                  </div>
                  <div className="form-floating col-6 ">
                    <input type="number" class="form-control" id="poids"
                           value={props.poids}  
                           onChange={event => { props.onPoidsChange(event.target.value) }}
                    />
                    
                    <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Poids </label>
                    
                 </div>
                 
                 {(props.erreurPoids===true && (props.poids===0 || props.poids==='') ) && <p style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids </p>}

                {props.categorie === "poulet" && <div className="form-floating col-6 mb-3">
                    <input type="number" class="form-control" id="nbr"
                           value={props.nombre} 
                           onChange={event => { props.onNombreChange(event.target.value) }}
                    
                    />
                    <label for="nbr" style={{color:"#000" , fontWeight:"bold"}}> Nombre </label>
                </div>}
                
                {props.categorie === "poulet" && (props.erreurNombre===true && (props.nombre===0 || props.nombre==='') ) && <p style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre </p>}
                    
                    
            </div>

        </>
    )
}