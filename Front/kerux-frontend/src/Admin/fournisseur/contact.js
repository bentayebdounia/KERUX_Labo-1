import { useState } from "react"

export default function Contact(props){
    
   

    return (
        <>
            
            
                
                  <div className="form-floating col-4 ">
                    <input type="text" class="form-control" id="produit" style={{height:"50px"}}
                            value={props.nomContact} 
                            onChange={event => { props.onNomContactChange(event.target.value) }}          
                    />
         
                    <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Nom de contact</label>
                  </div>
                  <div className="form-floating col-4 ">
                    <input type="text" class="form-control" id="poids" style={{height:"50px"}}
                           value={props.numContact} 
                           onChange={event => { props.onNumContactChange(event.target.value) }}
                    />
                    <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Tel</label>
                </div>
                
                    
                    
            

        </>
    )
}