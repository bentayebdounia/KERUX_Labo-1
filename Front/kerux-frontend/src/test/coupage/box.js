import { useState } from "react"

export default function Box(props){

    return (
        <div>
            <input value={props.product} onChange={event => {
                props.onProductChange(event.target.value)
            }} placeholder="Produit" />

            <input value={props.weight} onChange={event => {
                            props.onWeightChange(event.target.value)
                        }} placeholder="Poids" />
        </div>
    )
}