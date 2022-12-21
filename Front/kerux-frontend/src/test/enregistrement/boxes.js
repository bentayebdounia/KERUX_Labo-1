import { useState } from "react"

export default function Boxes(props){
    
   

    return (
        <>
            
            <div className="row gy-2 gx-2 align-items-left">
                
                  <div className="form-floating col-12 ">
                    <input type="text" class="form-control" id="produit"
                            value={props.n_produit}           
                    />
         
                    <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Type de produit</label>
                  </div>
                  <div className="form-floating col-6 ">
                    <input type="text" class="form-control" id="poids"
                           value={props.poids} 
                           onChange={event => { props.onPoidsChange(event.target.value) }}
                    />
                    <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Poids </label>
                </div>
                <div className="form-floating col-6 mb-3">
                    <input type="text" class="form-control" id="nbr"
                           value={props.nombre} 
                           onChange={event => { props.onNombreChange(event.target.value) }}
                    
                    />
                    <label for="nbr" style={{color:"#000" , fontWeight:"bold"}}>Nombre </label>
                </div>
                    
                    
            </div>

        </>
    )
}