import React ,{useState,useEffect} from 'react'
import Box from './box'
import "./appp.css"
import TESTPRINT from './testPrint'
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
                <div className='display-print'>
                    <TESTPRINT/>
                </div>
                    <button id="btnPrint" className="hidden-print" onClick={ print }>Print</button>

                  

        </>
    )
}
export default Appp;