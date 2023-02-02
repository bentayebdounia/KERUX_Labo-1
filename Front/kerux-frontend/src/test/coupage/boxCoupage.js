import { useState } from "react"

export default function BoxCoupage(props){
    //console.log(props.id_box);

    const key = (key) => {
        return alert(key)
    }
    return (
        <>
            {props.k===0 && <input type="text" className="form-control mb-1" aria-describedby="button-addon2" value={props.id_box} onChange={event => {
                props.onIdChange(event.target.value)
            }} placeholder="ID box" />}
            {props.k >0 && 
                <>
                    
                    <div class="input-group mb-1">
                        <input type="text" class="form-control"  value={props.id_box} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button className="btn" style={{background: '#7B170F' }} type="button" id="button-addon2"
                                                  onClick={() => { key(props.k); props.supprimerBox(props.k-1)}} >
                                                 <i className="bi bi-x-lg" style={{color: "white" , fontSize:"20px"}}></i>
                        </button>
                    </div>
                </>
                }

        </>
    )
}