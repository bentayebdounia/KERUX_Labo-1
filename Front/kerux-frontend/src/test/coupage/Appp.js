import React ,{useState,useEffect} from 'react'
import Box from './box'
import "./appp.css"
var Barcode = require('react-barcode')

function Appp(){
    

    //const [users,setUsers] = useState([])

    //const [editMode,setEditMode] = useState(-1)

    const [boxes,setBoxes] = useState([{
        product:'',
        weight:0,
        number:0,
        date:new Date()
    }])

 
/*
    const onEditClick = key => {
        if(editMode === -1)
            setEditMode(key)
        else
            setEditMode(-1)
    }

    const onDeleteClick = key => {
        const usersCopy = [...users]
        usersCopy.splice(key,1)
        setUsers(usersCopy)
    }
*/
console.log(boxes);

const print =() => {
    window.print()
}
    return (
        <>

            <div class="ticket">
                        
                        
                        <table>
                            <thead>
                                <tr>
                                    <th class="quantity">P.</th>
                                    <th class="price">N.</th>
                                    <th class="description">Description</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>
                                    <td class="quantity">20Kg</td>
                                    <td class="price">10</td>
                                    <td class="description">Poulet</td>
                                </tr>
                                <tr>
                                    <Barcode value="014008193LT05"  width= {1}  flat={ true}/>
                                </tr>
                                
                            </tbody>
                        </table>
                        
                        
                    </div>
                    <button id="btnPrint" class="hidden-print" onClick={ print }>Print</button>

                  

        </>
    )
}
export default Appp;