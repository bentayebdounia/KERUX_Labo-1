import { useState } from "react"

export default function Boxes(props){

    

    return (
        <>
            
            <div className="row gy-2 gx-2 align-items-center">
                
                  <div className=" col-12 mb-2">
                   <label  id="produit" >Type de produit: </label>
                    <label id="produitValue" > {props.n_produit} </label>
                  </div>

                <div className="row mb-2 ">
                  
                    
                    <div className="col-1 me-0 " style={{paddingRight:'0px'}}>
                        <label htmlFor="poids" >Poids</label>
                    </div>
                    <div className="col-4">
                        <input type="number" class="form-control" 
                            value={props.poids}  
                            onChange={event => { props.onPoidsChange(event.target.value) }}
                        />
                        {(props.erreurPoids===true && (props.poids=== 0 || props.poids=== '0' || props.poids==='') ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids </p>}
                    </div>

                 <div className="col-2 ">
                        <select className="form-select" aria-label="Default select example" 
                                value={props.unite} 
                                onChange={event => { props.onUniteChange(event.target.value)}} 
                                required>
                            <option defaultValue=""></option>
                            <option value="kg">Kg</option>
                            <option value="gramme">Gr</option>
                        </select>
                        {props.unite ==="" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner l'unité </p>}
                </div>

                 
                {props.categorie === "poulet" &&
                <>
                    <div className="col-1">
                        <label htmlFor="nbr" >Nombre </label>
                    </div>
                    <div className="col-4">
                        <input type="number" class="form-control" id="nbr"
                            value={props.nombre} 
                            onChange={event => { props.onNombreChange(event.target.value) }}
                        
                        />
                        {props.categorie === "poulet" &&  (props.nombre===0 || props.nombre==='0' || props.nombre==='')  && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre </p>}
                    </div>
                </>}
                
                
                
            </div>
            </div>

        </>
    )
}