import { useState } from "react"

export default function BoxCoupage(props){
    console.log(props.id_box);

    return (
        <>
            <input type="text" className="form-control" aria-describedby="button-addon2" value={props.id_box} onChange={event => {
                props.onIdChange(event.target.value)
            }} placeholder="ID box" />

        </>
    )
}