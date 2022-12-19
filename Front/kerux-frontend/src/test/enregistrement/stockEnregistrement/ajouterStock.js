import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import ServiceEntrepot from '../../../service/service.entrepot'

import ServiceStock from '../../../service/service.stock'

const AjouterStock = (props) => {

    const [entrepots, setEntrepots] = useState([])
    const [entrepot, setEntrepot] = useState()
    const [stock , setStock] = useState()
    
    const [boxe,setBoxe] = useState(
        props.tableBox.map(d => {
            return {
                select: false,
                id_gnerate: d.id_gnerate,
                categorie: d.categorie,
                nom_produit: d.nom_produit,
                poids: d.poids,
                nombre: d.nombre
            
            };
        })
        
        )
    
  
    useEffect(()=> {
        ServiceEntrepot.getEntrepot()
        .then ((res)=> {
            setEntrepots(res.data)
            
        })
    })

    const  ajouterauStock = async(id_gnerate) =>{
       
        await ServiceStock.ajouterStock(entrepot).then((res) => {
            setStock(res.data)
            console.log(res.data)
            //console.log(stock.id_stock)
            ServiceStock.modifierProcess(id_gnerate, res.data.id_stock).then( (res) => {
                console.log(res.data)
            })
            
        })     
    }
   
    const ajout = async() => {
        
        
  
        for (var i=0 ; i<boxe.length ;i++) {
            if (boxe[i].select === true){
                console.log(boxe[i].id_gnerate);
                await ajouterauStock(boxe[i].id_gnerate)
                boxe.splice(i,1)
                i=i-1
                }
        }
        //props.handleClose()    
        
    }

    const non = () => {
        
        props.handleClose ()    

    }
    
    //console.log(props.tableBox);

    return (  
        <>
            <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ajouter au stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <div style={{margin:"5%", marginRight:"5%"}}>
                                <div className="mb-3 row">
                                    <label htmlFor="entrepot" className="col-sm-2 col-form-label">Etrepot</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example" id="entrepot" value={entrepot} onChange={(e)=> setEntrepot(e.target.value)}  required>
                                            <option defaultValue={""}></option>
                                            {entrepots.map( (entrepot,key) =>
                                                
                                                <option value={entrepot.id_entrepot}> {entrepot.nom_entrepot} </option>
                                            )}
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                                    <table className="table table-bordered"  >
                                    <thead>
                                        <tr>
                                        <th scope="col">
                                            <input
                                                type="checkbox"
                                                onChange={e => {
                                                let checked = e.target.checked;
                                                setBoxe(
                                                    boxe.map(d => {
                                                    d.select = checked;
                                                    return d;
                                                    })
                                                );
                                                }} >

                                                </input>
                                            </th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Categorie</th>
                                            <th scope="col">Nom produit</th>
                                            <th scope="col">Poids</th>
                                            <th scope="col">Nombre</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                
                                        {
                                            boxe.map( (p, key) =>
                                                    <tr key={key}>
                                                        <th scope="row">
                                                            <input
                                                            onChange={event => {
                                                                let checked = event.target.checked;
                                                                setBoxe(
                                                                boxe.map(data => {
                                                                    if (p.id_gnerate === data.id_gnerate) {
                                                                    data.select = checked;
                                                                    }
                                                                    return data;
                                                                })
                                                                );
                                                            }}
                                                            type="checkbox"
                                                            checked={p.select}
                                                            ></input>
                                                        </th>
                                                        <td>{p.id_gnerate}</td>
                                                        <td>{p.categorie}</td>
                                                        <td>{p.nom_produit}</td>
                                                        <td>{p.poids}</td>
                                                        <td>{p.nombre}</td>
                                                        
                                                    </tr>
                                            )
                                        }
                                       
                                    </tbody>
                                    </table>
                                </div>
                            
                        </div> 
               
            </Modal.Body>
            <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ ()=> non ()}>Non</button>
                    <button type="button" className="btn btn-success" onClick={ ()=>ajout() } >Oui</button>
                    <button type="button" className="btn btn-dark" onClick={ props.handleClose } >Terminer</button>
            </Modal.Footer>
             </Modal>

             
        </>
        
        
     )
}
 
export default AjouterStock;