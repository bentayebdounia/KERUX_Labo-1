import { useState } from "react"

export default function Boxes(props){

    

    return (
        <>
            
            <div className="row gy-2 gx-2 align-items-left">
                
                  <div className=" col-12 ">
                   <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Type de produit: </label>
                    <label for="produit" style={{color:"#000"}} > {props.n_produit} </label>
                  </div>
                  <div className="col-4">
                  <div className="form-floating  " style={{ paddingRight:'0px'}}>
                    <input type="number" class="form-control" id="poids"
                           value={props.poids}  
                           onChange={event => { props.onPoidsChange(event.target.value) }}
                    />
                    
                    <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Poids </label>
                    
                 </div>
                 
                 {(props.erreurPoids===true && (props.poids=== 0 || props.poids=== '0' || props.poids==='') ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids </p>}
                 </div>
                 <div className="col-2 mb-3" style={{ paddingLeft:'0px'}}>
                        <select className="form-select" aria-label="Default select example" id="categorie"
                                value={props.unite} 
                                onChange={event => { props.onUniteChange(event.target.value)}} 
                                style={{height:"58px",width:"80px" }}
                                required>
                            <option ></option>
                            <option value="kg">Kg</option>
                            <option value="gramme">G</option>
                        </select>
                        {props.unite === "" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner l'unité </p>}
                    </div>
                 <div className="col-5  mb-3">
                {props.categorie === "poulet" && <div className="form-floating ">
                    <input type="number" class="form-control" id="nbr"
                           value={props.nombre} 
                           onChange={event => { props.onNombreChange(event.target.value) }}
                    
                    />
                    <label for="nbr" style={{color:"#000" , fontWeight:"bold"}}> Nombre </label>
                </div>}
                
                {props.categorie === "poulet" &&  (props.nombre===0 || props.nombre==='0' || props.nombre==='')  && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre </p>}
                </div>
                    
            </div>

        </>
    )
}