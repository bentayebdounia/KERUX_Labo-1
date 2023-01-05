import React ,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'


const Recape = (props) => {

    const [entrepots, setEntrepots] = useState([])
    const [entrepot, setEntrepot] = useState()
    const [stock , setStock] = useState()
    const [boxe,setBoxe] = useState([])

    useEffect(()=>{
        for(var i=1 ; i<2; i++){
            boxe= boxe.concat(JSON.parse(localStorage.getItem('boxes'+i)))
        }
    },[])
    
    const non = () => {
        
        props.handleClose ()    

    }
    
    //console.log(props.tableBox);

    return (  
        <>
            <Modal size="lg" scrollable={true} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recape de l'etape enregistrement</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{margin:"5%", marginRight:"5%"}}>
                                        
                                        <div className="divTab" style={{width:"100%" , margin:"0px"}}>
                                            <table className="table table-bordered"  >
                                            <thead>
                                                <tr>
                                                
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
                                                                
                                                                <td>{p.id_produit}</td>
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
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={ ()=> non ()}>VALIDER</button>
                        
                </Modal.Footer>
             </Modal>

             
        </>
        
        
     )
}
 
export default Recape;