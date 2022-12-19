import React ,{useState,useEffect} from 'react'
import Box from './box'
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
    return (
        <div>

            {boxes.map((box,key) => {
                return (
                    <div key={key}>
                        <Box product={box.product} onProductChange={newProductName => {
                            const newBoxes = [...boxes]
                            newBoxes[key].product = newProductName
                            setBoxes(newBoxes)
                        }}
                            weight={box.weight} onWeightChange = {newWeight => {
                                const newBoxes = [...boxes]
                                newBoxes[key].weight = newWeight
                                setBoxes(newBoxes)
                            }}
                        />
                        
                        {key === 0 && <button onClick={() => {
                            
                            const newBoxes = [...boxes]
                            
                            newBoxes.push({
                                product:'',
                                weight:0,
                                number:0,
                                date:new Date()
                            })
                            
                            setBoxes(newBoxes.sort((a,b) => {
                                if(a.date < b.date)
                                    return 1
                                if(a.date > b.date)
                                    return -1
                                return 0
                            }))
                            console.log("box=  "+boxes[0].product);
                        }}>
                            Ajouter une box
                        </button>}
                    </div>
                )
            })}


        </div>
    )
}
export default Appp;