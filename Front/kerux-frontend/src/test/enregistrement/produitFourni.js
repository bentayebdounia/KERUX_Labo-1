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
            
            <div className="form-floating">
                <input type="number" class="form-control" id="nbr"
                           value={props.nombre} 
                           onChange={event => { props.onNombreChange(event.target.value) }}
                    
                    />
                <label for="nbr" style={{color:"#000" , fontWeight:"bold"}}>Nombre fourni</label>
                {props.erreurNombre===true && (props.nombre === "" || props.nombre === "0" || props.nombre === 0 ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le nombre fourni </p>}
            </div>
            
               
    )
}

        if(props.categorie==="legume"){
            TypeLegume=(
                <>
                            <option defaultValue={""}></option>
                            <option value="frite"> Frite</option>
                            <option value="laitue">Laitue</option>
                            <option value="tomate">Tomate</option>
                            <option value="oignon">oignon</option>
                            <option value="choux">Coux</option>
                            <option value="carotte">Carotte</option>
                            
                </>
            )}


    return (
        <>
            
            <div className="row gy-2 gx-2 align-items-left">
                
                <div col-12>
                    <div className="form-floating  ">
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
                    {props.erreurCategorie ===true && props.categorie === ""  && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner une categorie </p>}
                </div>
                <div className="col-12 ">  
                    <div className="form-floating">
                        <select className="form-select" aria-label="Default select example" id="produit"
                                value={props.nom_produit} 
                                onChange={event => { props.onNom_produitChange(event.target.value) }}
                        required>
                        {TypePoulet}
                        {TypeLegume}

                        </select>
                        <label for="produit" style={{color:"#000", fontWeight:"bold"}} >Type de produit</label>
                    </div>
                    {props.erreurProduit === true && props.nom_produit === "" && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez selectionner un type de produit </p>}
                </div>  
                    <div className="col-5" style={{marginRight:"0px"}}>
                        <div className="form-floating">
                            <input type="number" class="form-control" id="poids"
                                value={props.poids} 
                                onChange={event => { props.onPoidsChange(event.target.value) }}
                            />
                            
                            <label for="poids" style={{color:"#000", fontWeight:"bold"}}>Poids fourni</label>
                        </div>
                        
                        {props.erreurPoids ===true && (props.poids === "" || props.poids === "0" || props.poids === 0 ) && <p  style={{ color:'red' , fontSize:"11px"}}> *Veillez ajouter le poids fourni </p>}
                    </div>
                    <div className="col-2" style={{marginRight:"30px", width:"70px"}}>
                    <select className="form-select" aria-label="Default select example" style={{width:"70px", height:"58px" , padding:"10px"}}  required>
                                <option defaultValue="kg">Kg</option>
                                <option value="gramme">g</option>
                            </select>
                    </div>
                    <div className="col-5 mb-3">
                        {nbr}
                    </div>
                    
            
            </div>

        </>
    )
}