import { useState } from "react"

export default function ProduitFourni(props){
    //console.log(props.id_box);

    var nbr, TypePoulet, TypeLegume

    if(props.categorie === "poulet"){
        TypePoulet=(
            <>
                        <option defaultValue ={""}></option>
                        <option value ={"poulet"}>poulet</option>
                        <option value = "tendres" > Tendres</option>
                        <option value = "wings" >Wings</option>
                        <option value =" dips" >Dips</option>
                        <option value = "hotDogs" >HotDogs</option>
                        
            </>
        )

        nbr=(
            <>
                <input type="text" class="form-control" id="nbr"
                           value={props.nombre} 
                           onChange={event => { props.onNombreChange(event.target.value) }}
                    
                    />
                <label for="nbr" style={{color:"#000" , fontWeight:"bold"}}>Nombre fourni</label>
            </>
               
    )
}

        if(props.categorie==="legume"){
            TypeLegume=(
                <>
                            <option defaultValue={""}></option>
                            <option value="frite"> Frite</option>
                            <option value="laitue">Laitue</option>
                            <option value="tomate">Tomate</option>
                            <option value="oignin">oignin</option>
                            <option value="choux">Coux</option>
                            <option value="carotte">Carotte</option>
                            
                </>
            )}


    return (
        <>
            
            <div className="row gy-2 gx-2 align-items-left">
                
                
                    <div className="form-floating col-12 ">
                        <select className="form-select" aria-label="Default select example" id="categorie"
                                value={props.categorie} 
                                onChange={event => { props.onCategorieChange(event.target.value)}} 
                        required>
                        <option selected></option>
                        <option value="poulet">Poulet</option>
                        <option value="legume">Legume</option>
                        <option value="autre">Autre</option>
                        </select>
                        <label for="categorie" style={{color:"#000" , fontWeight:"bold"}} >  Categorie  </label>
                    </div>
                    <div className="form-floating col-12 ">
                        <select className="form-select" aria-label="Default select example" id="produit"
                                value={props.nom_produit} 
                                onChange={event => { props.onNom_produitChange(event.target.value) }}
                        required>
                        {TypePoulet}
                        {TypeLegume}

                        </select>
                        <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Type de produit</label>
                    </div>
                    <div className="form-floating col-6 ">
                        <input type="text" class="form-control" id="poids"
                            value={props.poids} 
                            onChange={event => { props.onPoidsChange(event.target.value) }}
                        />
                        <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Poids fourni</label>
                    </div>
                    <div className="form-floating col-6 mb-3">
                        {nbr}
                    </div>
                    
            
            </div>

        </>
    )
}